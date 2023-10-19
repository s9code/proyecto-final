import mysql from 'mysql2'

// Datos de conexion a la bse de datos
const db = mysql.createConnection({
  host: 'localhost',
  user: 's9code',
  password: '123456',
  database: 'comic_manga'
})

db.connect()

db.connect((err) => {
  if (err) {
    console.error('Error al conectarse a la base de datos:', err)
    throw err
  }
  console.log('Conectado a la base de datos')
})

export default db
