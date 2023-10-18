import express from 'express'
// Importar controlador comics
import comicsController from './controllers/comicController.js'

const app = express()
const port = 3000

// Middleware para procesar datos JSON en solicitudes POST
app.use(express.json())
app.use(comicsController)

// Ruta de ejempo para tu inicio web
app.get('/', (req, res) => {
  res.send('Bienvenido a tu aplicacion Web!')
})

app.listen(port, () => {
  console.log(`Servidor en funcionamiento en http://localhost:${port}`)
})
