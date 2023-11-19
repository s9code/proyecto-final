import express from 'express'
import db from '../bd.js'

const router = express.Router()

// CRUD

// INSERTAR
router.post('/addcomics', (req, res) => {
  const q = 'INSERT INTO comics (`titulo_comic`, `autor_comic`, `cover_comic`, `publicacion_comic`) values (?)'
  const values = [
    req.body.titulo,
    req.body.autor,
    req.body.cover,
    req.body.publicacion
  ]
  db.query(q, [values], (err, data) => {
    if (err) return res.json(err)
    return res.json('Comic agregado correctamente')
  })
})
// -------------------------------------------------
// BORRAR
router.delete('/comics/:id', (req, res) => {
  const comicId = req.params.id
  const q = 'DELETE FROM comics WHERE id_comic = ?'
  db.query(q, [comicId], (err, data) => {
    if (err) return res.json(err)
    return res.json('Comic borrado correctamente')
  })
})
// -------------------------------------------------
// ACTUALIZAR
router.put('/comics/:id', (req, res) => {
  const comicId = req.params.id
  const q = 'UPDATE comics SET titulo_comic = ?, autor_comic = ?, cover_comic = ?, publicacion_comic = ? WHERE id_comic = ?'

  const values = [
    req.body.titulo,
    req.body.autor,
    req.body.cover,
    req.body.publicacion
  ]
  db.query(q, [...values, comicId], (err, data) => {
    if (err) return res.json(err)
    return res.json('Comic actualizado correctamente')
  })
})
// -------------------------------------------------
// LECTURA
router.get('/comics', (req, res) => {
  const q = 'SELECT * FROM comics'
  db.query(q, (err, data) => {
    if (err) return res.json(err)
    return res.json(data)
  })
})
// -------------------------------------------------
// ASOCIAR COMIC A COLECCION
router.post('/comics/:id/coleccion/:id_coleccion', (req, res) => {
  const comicId = req.params.id
  const coleccionId = req.params.id_coleccion

  // Verificar si el cómic ya está asociado a la colección
  const checkQuery = 'SELECT * FROM comic_coleccion WHERE id_comic = ? AND id_coleccion = ?'
  db.query(checkQuery, [comicId, coleccionId], (checkErr, checkData) => {
    if (checkErr) {
      return res.status(500).json({ error: 'Error en la base de datos' })
    }

    if (checkData && checkData.length > 0) {
      // El cómic ya está asociado a esta colección, enviar un mensaje de error
      return res.status(400).json({ error: 'El cómic ya está en esta colección' })
    } else {
      // El cómic no está en la colección, proceder a asociarlo
      const insertQuery = 'INSERT INTO comic_coleccion (`id_comic`, `id_coleccion`) values (?, ?)'
      db.query(insertQuery, [comicId, coleccionId], (insertErr, insertData) => {
        if (insertErr) {
          return res.status(500).json({ error: 'Error al asociar el cómic a la colección' })
        }
        return res.status(200).json({ message: 'Cómic asociado a la colección correctamente' })
      })
    }
  })
})

// VER COLECCION CON COMICS AGREGADOS
router.get('/coleccion/:id_coleccion/comics', (req, res) => {
  const coleccionId = req.params.id_coleccion
  const q = 'SELECT comics.* FROM comics INNER JOIN comic_coleccion ON comics.id_comic = comic_coleccion.id_comic WHERE comic_coleccion.id_coleccion = ?'

  db.query(q, [coleccionId], (err, data) => {
    if (err) return res.json(err)
    return res.json(data)
  })
})

router.get('/coleccionComics', (req, res) => {
  const q = 'SELECT * FROM comics'
  db.query(q, (err, data) => {
    if (err) return res.json(err)
    return res.json(data)
  })
})

// BORRAR COMICS DE COLECCION
router.delete('/coleccion/:id_coleccion/comics/:id_comic', (req, res) => {
  const comicId = req.params.id_comic
  const coleccionId = req.params.id_coleccion

  // Verificar si el cómic está en la colección antes de eliminarlo
  const checkQuery = 'SELECT * FROM comic_coleccion WHERE id_comic = ? AND id_coleccion = ?'
  db.query(checkQuery, [comicId, coleccionId], (checkErr, checkData) => {
    if (checkErr) {
      return res.json(checkErr)
    }

    // Si el cómic está asociado a la colección, procede a eliminarlo
    if (checkData && checkData.length > 0) {
      const deleteQuery = 'DELETE FROM comic_coleccion WHERE id_comic = ? AND id_coleccion = ?'
      db.query(deleteQuery, [comicId, coleccionId], (deleteErr, deleteData) => {
        if (deleteErr) {
          return res.json(deleteErr)
        }
        return res.json('Comic eliminado de la colección correctamente')
      })
    } else {
      return res.json('El cómic no está asociado a esta colección')
    }
  })
})

export default router
