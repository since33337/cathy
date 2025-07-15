const mysql = require('mysql');

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306
});

// Connecter à la base de données
db.connect((err) => {
  if (err) {
    console.error('Erreur connexion DB:', err);
    return;
  }
  console.log('Connecté à la base de données MySQL');
});

module.exports = db;