require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db");

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
  console.log(req.body);
  res.json({ message: 'success', body: req.body });
});
app.get('/vanilla/error', async (req, res) => {
  console.log(req.body);
  res.json({ message: 'error', body: req.body });
});

// Ecoute du serveur
app.listen(3001, (err) => {
  if (err) throw err;
  console.log(`Server running on port: 3001`);
});
