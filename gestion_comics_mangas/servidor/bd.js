const express = require('express');
const app = express();
const port = 3000;

const mysql = require('mysql2');

const conector = mysql.createConnection( {
  host: 'localhost',
  user: 's9code',
  password: '123456',
  database: 'comic_manga'
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

