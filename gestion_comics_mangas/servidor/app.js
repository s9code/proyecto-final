import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
// Importar controlador comics
import comicsController from './controllers/comicController.js'
import mangaController from './controllers/mangaController.js'
import userController from './controllers/userController.js'
import signupController from './controllers/signupController.js'

const port = 8081
const app = express()
app.use(express.json())
app.use(cors(
  {
    origin: ['http://localhost:3000'],
    methods: ['POST, GET', 'PUT', 'DELETE'],
    credentials: true
  }
))

app.use(cookieParser())

// Middleware para procesar datos JSON en solicitudes POST
app.use(comicsController)
app.use(mangaController)
app.use(userController)
app.use(signupController)

// Ruta de ejempo para tu inicio web
app.get('/', (req, res) => {
  res.send('Bienvenido a tu aplicacion Web!')
})

app.listen(port, () => {
  console.log(`Servidor en funcionamiento en http://localhost:${port}`)
})
