import express from 'express'
import db from '../bd.js'
const router = express.Router()

router.get('/mangas', (req, res) => {
  const q = 'SELECT * FROM mangas'
  db.query(q, (err, data) => {
    if (err) return res.json(err)
    return res.json(data)
  })
})

router.post('/mangas', (req, res) => {
  const q = 'INSERT INTO mangas (`titulo_manga`, `autor_manga`, `publicacion_manga`) VALUES (?)'
  const values = [
    'Titulo del backend',
    'Auto del backend',
    2
  ]

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err)
    return res.json('Manga ingresado con exito')
  })
})

export default router
