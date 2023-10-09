const express = require('express');
const app = express();
const port = 3000;

const bd = require('./bd');

app.get('/', (req, res) => {
  res.send("Hola mundo!");
});

app.listen(port, () => {
  console.log(`Servidor Express en funcionamiento en http://localhost:${port}`);
});