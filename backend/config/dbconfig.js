require('dotenv').config();
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  // Ajoutez ces options pour gérer les timeouts
  connectTimeout: 60000,
  acquireTimeout: 60000,
  timeout: 60000,
  reconnect: true
});

connection.connect(err => {
  if (err) {
    console.error('Erreur connexion DB:', err);
    // Ne pas arrêter l'application, juste logger l'erreur
  } else {
    console.log('✅ Connecté à la base Railway !');
  }
});

// Gestion des erreurs de connexion
connection.on('error', (err) => {
  console.error('Erreur de connexion DB:', err);
  if (err.code === 'PROTOCOL_CONNECTION_LOST') {
    console.log('Tentative de reconnexion...');
  }
});

module.exports = connection;