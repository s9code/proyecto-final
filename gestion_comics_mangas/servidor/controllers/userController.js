import express from 'express'
import db from '../bd.js'
// Autenticacion de usuario Cookies
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'

const router = express.Router()

router.use(cookieParser())

const verifyUser = (req, res, next) => {
  const token = req.cookies.token
  if (!token) {
    return res.json({ Message: 'we need token please provide it' })
  } else {
    jwt.verify(token, 'our-jsonwebtoken-secret-key', (err, decoded) => {
      if (err) {
        return res.json({ Message: 'Authentication Error.' })
      } else {
        req.name = decoded.name
        next()
      }
    })
  }
}

router.post('/usuario', (req, res) => {
  const sql = 'SELECT * FROM usuario WHERE correo_usuario = ? AND contra_usuario = ?'
  db.query(sql, [req.body.email, req.body.password], (err, data) => {
    if (err) return res.json({ Message: 'Server Side Error' })
    if (data.length > 0) {
      // CREAR TOKENS
      const name = data[0].name
      const token = jwt.sign({ name }, 'our-jsonwebtoken-secret-key', { expiresIn: '1d' })
      res.cookie('token', token)
      return res.json({ Status: 'Success' })
    } else {
      return res.json({ Message: 'No Records existed' })
    }
  })
})

router.get('/', verifyUser, (req, res) => {
  return res.json({ Status: 'Success', name: req.name })
})

router.get('/usuario/logout', (req, res) => {
  res.clearCookie('token')
  res.send('Cookie eliminada')
})

router.get('/usuario', (req, res) => {
  const q = 'SELECT * FROM usuario'
  db.query(q, (err, data) => {
    if (err) return res.json(err)
    return res.json(data)
  })
})

export default router
