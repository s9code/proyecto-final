import express from 'express'
import db from '../bd.js'

const router = express.Router()

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

router.delete('/comics/:id', (req, res) => {
  const comicId = req.params.id
  const q = 'DELETE FROM comics WHERE id_comic = ?'

  db.query(q, [comicId], (err, data) => {
    if (err) return res.json(err)
    return res.json('Comic borrado correctamente')
  })
})

router.get('/comics', (req, res) => {
  const q = 'SELECT * FROM comics'
  db.query(q, (err, data) => {
    if (err) return res.json(err)
    return res.json(data)
  })
})

export default router
