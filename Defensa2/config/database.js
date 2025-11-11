const mysql = require('mysql2');
require('dotenv').config(); // Asegurar que carga las variables

console.log('Verificando variables de entorno:');
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD ? '***' : '(vacío)');
console.log('DB_NAME:', process.env.DB_NAME);

const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'defensa2'
});

connection.connect((error) => {
    if (error) {
        console.error(' Error conectando a la base de datos:', error.message);
        return;
    }
    console.log(' Conectado a la base de datos MySQL');
});

module.exports = connection;