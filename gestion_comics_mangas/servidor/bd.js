const express = require('express');
const app = express();
const port = 3000;

const mysql = require('mysql2');

// Middleware para procesar datos JSON en solicitudes POST
app.use(express.json());

// Datos de conexion a la bse de datos
const conector = mysql.createConnection( {
  host: 'localhost',
  user: 's9code',
  password: '123456',
  database: 'comic_manga'
});

// Ruta de ejempo para tu inicio web
app.get('/', (req, res) => {
  res.send('Bienvenido a tu aplicacion Web!')
});

app.get('/json', function (req, res) {
  conector.connect((err) => {
    if (err) {
      console.error('Error al conectarse a la base de datos: ' + err.message);
      return;
    }
      console.log('Conectado a la base de datos');
    });
    
  conector.query('SELECT * FROM comics', function(err, rows, fields) {
    conector.end();
    if (err) throw err;
    res.json(rows);  
  });
});

app.listen(port, () => {
  console.log(`Servidor en funcionamiento en http://localhost:${port}`);
});

