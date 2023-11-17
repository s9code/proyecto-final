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

  const q = 'INSERT INTO comic_coleccion (`id_comic`, `id_coleccion`) values (?, ?)'
  db.query(q, [comicId, coleccionId], (err, data) => {
    if (err) return res.json(err)
    return res.json('Cómic asociado a la colección correctamente')
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

export default router
