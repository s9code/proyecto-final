const express = require('express');
const router = express.Router();

const bd = require('./bd');

app.get('/', (req, res) => {
  res.send("Hola mundo!");
});

app.listen(port, () => {
  console.log(`Servidor Express en funcionamiento en http://localhost:${port}`);
});