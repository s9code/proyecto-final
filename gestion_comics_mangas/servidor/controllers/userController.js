import express from 'express'
import db from '../bd.js'

const router = express.Router()

router.post('/usuario', (req, res) => {
  const q = 'SELECT * FROM usuario WHERE correo_usuario = ? AND contra_usuario = ?'

  db.query(q, [req.body.email, req.body.password], (err, data) => {
    if (err) return res.json('Error')
    if (data.length > 0) {
      return res.json('Logeado con éxito')
    } else {
      return res.json('Usuario o contraseña incorrectos')
    }
  })
})

router.get('/usuario', (req, res) => {
  const q = 'SELECT * FROM usuario'
  db.query(q, (err, data) => {
    if (err) return res.json(err)
    return res.json(data)
  })
})

export default router
