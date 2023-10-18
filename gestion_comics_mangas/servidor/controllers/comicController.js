import express from 'express'
const router = express.Router();

import db from '../bd.js';

router.get('/comics', (req, res) => {
  const q = "SELECT * FROM comics"
  db.query(q,(err,data)=> {
    if(err) return res.json(err)
    return res.json(data)
  })
})

router.post('/comics', (req, res) => {
  const q = "INSERT INTO comics (`titulo_comic`, `autor_comic`, `publicacion_comic`) VALUES (?)";
  const values = [
    'Titulo del backend',
    'Auto del backend',
    2,
  ];

  db.query(q,[values], (err,data)=> {
    if(err) return res.json(err)
    return res.json('Comic ingresado con exito')
  })
})

export default router;

