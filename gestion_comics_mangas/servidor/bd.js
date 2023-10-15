const mysql = require('mysql2');

// Datos de conexion a la bse de datos
const db =  {
  host: 'localhost',
  user: 's9code',
  password: '123456',
  database: 'comic_manga'
};

const conector = mysql.createConnection(db);

conector.connect((err) => {
  if (err) {
    console.error('Error al conectarse a la base de datos:', err);
    throw err;
  }
  console.log('Conectado a la base de datos');
});

module.exports = conector;