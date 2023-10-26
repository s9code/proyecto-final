const express = require('express')

const router = express.Router()

// Obtener todos los comics
router.get('/comics', function(req, res) {
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

// Crear nuevos comics
router.post('/comics', comicController.createComics)

// Obtener un comic por su ID
router.get('/comics/:id', comicController.getComicById)

// Actualizar un comic por su ID
router.get('/comics/:id', comicController.updateComic)

// eliminar un comic por su ID
router.get('/comics/:id', comicController.deleteComic)

module.exports = comicsRouter