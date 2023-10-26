import express from 'express'
import db from '../bd.js'

const router = express.Router()

router.post('/registro', (req, res) => {
  const q = 'INSERT INTO usuario (`nombre_usuario`, `correo_usuario`, `contra_usuario`) values (?)'
  const values = [
    req.body.name,
    req.body.email,
    req.body.password
  ]
  db.query(q, [values], (err, data) => {
    if (err) return res.json(err)
    return res.json(data)
  })
})

export default router
