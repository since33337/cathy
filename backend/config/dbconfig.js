require('dotenv').config();
const mysql = require('mysql');

const connection = mysql.createConnection({
 host: process.env.DB_HOST,       // ex: shortline.proxy.rlwy.net
  user: process.env.DB_USER,       // root
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

connection.connect(err => {
  if (err) {
    console.error('Erreur connexion DB:', err);
  } else {
    console.log('✅ Connecté à la base Railway !');
  }
});

module.exports = connection;
