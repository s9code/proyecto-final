import express from 'express'
import db from '../bd.js'

const router = express.Router()

// CRUD

// CREAR COLECCION
router.post('/addcoleccion', (req, res) => {
  const q = 'INSERT INTO coleccion (`nombre_coleccion`, `descrip_coleccion`) values (?)'
  const values = [
    req.body.titulo,
    req.body.descrip
  ]
  db.query(q, [values], (err, data) => {
    if (err) return res.json(err)
    return res.json('Coleccion agregada correctamente')
  })
})
// -------------------------------------------------
// BORRAR
router.delete('/coleccion/:idCol', (req, res) => {
  const coleccionId = req.params.idCol
  const q = 'DELETE FROM coleccion WHERE id_coleccion = ?'
  db.query(q, [coleccionId], (err, data) => {
    if (err) return res.json(err)
    return res.json('Colección borrada correctamente')
  })
})
// -------------------------------------------------
// ACTUALIZAR
router.put('/coleccion/:idCol', (req, res) => {
  const coleccionId = req.params.idCol
  const q = 'UPDATE coleccion SET nombre_coleccion = ?, descrip_coleccion = ? WHERE id_coleccion = ?'

  const values = [
    req.body.titulo,
    req.body.descrip
  ]
  db.query(q, [...values, coleccionId], (err, data) => {
    if (err) return res.json(err)
    return res.json('Colección actualizada correctamente')
  })
})
// -------------------------------------------------
// LECTURA
router.get('/coleccion', (req, res) => {
  const q = 'SELECT * FROM coleccion'
  db.query(q, (err, data) => {
    if (err) return res.json(err)
    return res.json(data)
  })
})

export default router
