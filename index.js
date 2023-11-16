require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db");
const axios = require('axios');

const app = express();

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
  const formdata = new FormData();
  formdata.append("data", query);
  const res = axios.post('https://vanilla.unityfianar.com/decrypt.php', formdata);
  console.log(res);
  res.json({ message: 'success'});
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
