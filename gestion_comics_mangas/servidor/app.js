const express = require('express');
const app = express();
const port = 3000;

const db = require('./bd');

// Middleware para procesar datos JSON en solicitudes POST
app.use(express.json());

// Ruta de ejempo para tu inicio web
app.get('/', (req, res) => {
  res.send('Bienvenido a tu aplicacion Web!')
});

app.get('/json', function (req, res) {
    
  conector.query('SELECT * FROM comics', function(err, rows, fields) {
    conector.end();
    if (err) throw err;
    res.json(rows);  
  });
});

app.listen(port, () => {
  console.log(`Servidor en funcionamiento en http://localhost:${port}`);
});

