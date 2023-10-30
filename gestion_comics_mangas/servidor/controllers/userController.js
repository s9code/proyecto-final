import express from 'express'
import db from '../bd.js'
// Autenticacion de usuario Cookies
import jwt from 'jsonwebtoken'

const router = express.Router()

router.post('/usuario', (req, res) => {
  const q = 'SELECT * FROM usuario WHERE correo_usuario = ? AND contra_usuario = ?'

  db.query(q, [req.body.email, req.body.password], (err, data) => {
    if (err) {
      console.error('Error en la consulta a la bae de datos: ' + err.message)
      res.json({ authenticated: false })
    } else {
      if (data.length > 0) {
        // CREAR TOKENS
        const name = data[0].name
        const token = jwt.sign({ name }, 'our-jsonwebtoken-secret-key', { expiresIn: '1d' })
        res.cookie('token', token)
        // -------------
        console.error('Logeado con exito')
        res.json({ authenticated: true })
      } else {
        console.error('Datos incorrectos')
        res.json({ authenticated: false })
      }
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
