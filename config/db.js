const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST || '127.0.0.1', // usar IPv4 para evitar problemas con ::1
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'sistemarrhh',
  // port: process.env.DB_PORT || 3306 // descomenta si usas otro puerto
});

connection.connect((err) => {
  if (err) {
    console.error('Error de conexión a la base de datos:', err.message || err);
    process.exit(1); // opcional: salir si no se conecta
  }
  console.log('Conexión a la base de datos exitosa');
});

module.exports = connection;
