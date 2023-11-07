import express from 'express'
import db from '../bd.js'
// AUTENTICACIÓN DE USUARIOS
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'

const router = express.Router()
router.use(cookieParser())

// CREAR LA AUTENTIFICACIÓN
const verifyUser = (req, res, next) => {
  const token = req.cookies.token
  if (!token) {
    return res.json({ Message: 'Tienes que iniciar sesión' })
  } else {
    jwt.verify(token, 'our-jsonwebtoken-secret-key', (err, decoded) => {
      if (err) {
        return res.json({ Message: 'Error de autentificación.' })
      } else {
        req.name = decoded.name
        next()
      }
    })
  }
}
// ACCESO DEL USUARIO
router.post('/usuario', (req, res) => {
  const sql = 'SELECT * FROM usuario WHERE correo_usuario = ? AND contra_usuario = ?'
  db.query(sql, [req.body.email, req.body.password], (err, data) => {
    if (err) return res.json({ Message: 'Error del lado del servidor' })
    if (data.length > 0) {
      // CREAR TOKENS
      const name = data[0].name
      const token = jwt.sign({ name }, 'our-jsonwebtoken-secret-key', { expiresIn: '1d' })
      res.cookie('token', token)
      return res.json({ Status: 'Success' })
    } else {
      return res.json({ Message: 'Usuario Incorrecto' })
    }
  })
})

router.get('/', verifyUser, (req, res) => {
  return res.json({ Status: 'Success', name: req.name })
})
// -------------------------------------------------
// LOGOUT DEL USUARIO
router.get('/usuario/logout', (req, res) => {
  res.clearCookie('token')
  res.send('Cookie eliminada')
})
// -------------------------------------------------
// LEER DATOS DEL USUARIO
router.get('/usuario', (req, res) => {
  const q = 'SELECT * FROM usuario'
  db.query(q, (err, data) => {
    if (err) return res.json(err)
    return res.json(data)
  })
})

export default router
