import express from 'express'
const app = express();
const port = 3000;


// Importar controlador comics
import comicsController from './controllers/comicController.js';

// Middleware para procesar datos JSON en solicitudes POST
app.use(express.json());
app.use(comicsController)

// Ruta de ejempo para tu inicio web
app.get('/', (req, res) => {
  res.send('Bienvenido a tu aplicacion Web!')
});

/*// ruta para acceder a todos los comics
app.get('/comics', function(req, res) {
    db.query('SELECT * FROM comics', 
    (err, result) => {
      if(err) {
        console.error('Error al obtener los comics:', err);
        throw err;
      } else {
        res.send(result);
    }
  })
});

app.get('/json', function (req, res) {
    
  db.query('SELECT * FROM comics', function(err, rows, fields) {
    
    if (err) throw err;
    res.json(rows);  
  });
});*/

app.listen(port, () => {
  console.log(`Servidor en funcionamiento en http://localhost:${port}`);
});

