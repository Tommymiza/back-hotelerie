require("dotenv").config();
const express = require("express");
const cors = require("cors");
const supabase = require("./db");
const crypto = require("crypto");

const app = express();
function decrypt3DES(data, key) {
  try {
    let des_iv = Buffer.from("0000000000000000", "hex");
    let encryptedText = Buffer.from(data, "hex");
    let decipher = crypto.createDecipheriv(
      "des-ede3-cbc",
      Buffer.from(key.substr(0, 24)),
      des_iv
    );
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  } catch (e) {}
}
// Importation des middlewares
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT'],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get('/vanilla/success', async (req, res) => {
  const query = req.query;
  const private_key = "25cc31e830862928724394b25dda666d9074f597cad31f54c4";
  try {
    const data = {
      idpaiement: decrypt3DES(query.idpaiement, private_key),
      resultat: decrypt3DES(query.resultat, private_key),
      etablissement_id: decrypt3DES(query.idpanier, private_key),
      total_price: decrypt3DES(query.montant, private_key),
      ref_int: JSON.parse(decrypt3DES(query.ref_int, private_key) ?? ""),
      client_id: decrypt3DES(query.nom, private_key),
      date: decrypt3DES(query.date, private_key),
      ref_arn: decrypt3DES(query.ref_arn, private_key),
      code_arn: decrypt3DES(query.code_arn, private_key),
    };
    if (data.ref_int.t) {
      await supabase.from("table_bookings").insert({
        table_id: data.ref_int.t,
        client_id: data.client_id,
        date: data.ref_int.d,
        hours: data.ref_int.h,
        total_price: data.total_price,
        etablissement_id: data.etablissement_id,
      });
    } else {
      await supabase.from("room_bookings").insert({
        room_id: data.ref_int.c,
        client_id: data.client_id,
        date_start: data.ref_int.s,
        date_end: data.ref_int.en,
        total_price: data.total_price,
        etablissement_id: data.etablissement_id,
      });
    }
    return Response.json({ data });
  } catch (error) {
    console.log(error);
    return Response.json(error);
  }
});
app.get('/vanilla/error', async (req, res) => {
  console.log("error");
  res.json({ message: 'error' });
});

// Ecoute du serveur
app.listen(3001, (err) => {
  if (err) throw err;
  console.log(`Server running on port: 3001`);
});
