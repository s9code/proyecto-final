import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import path from 'path'
// IMPORTAR CONTROLADORES
import comicsController from './controllers/comicController.js'
import userController from './controllers/userController.js'
import signupController from './controllers/signupController.js'
import coleccionController from './controllers/coleccionController.js'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// -------------------------------------------------
// ACCESO A LA BASE DE DATOS
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
// -------------------------------------------------
// Middleware para procesar datos JSON en solicitudes POST
app.use(comicsController)
app.use(userController)
app.use(signupController)
app.use(coleccionController)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// -------------------------------------------------
// RUTA DE INICIO AL SERVIDOR
app.get('/', (req, res) => {
  res.send('Bienvenido a tu aplicacion Web!')
})

app.listen(port, () => {
  console.log(`Servidor en funcionamiento en http://localhost:${port}`)
})
