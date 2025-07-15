const express = require('express');
const cors = require('cors');
const multer = require('multer');
require("dotenv").config();

const productRoutes = require('./routes/productRoutes');
const PORT = process.env.PORT || 8800;

const app = express(); // application express

// 👉 CORS configuration — doit être placé AVANT les routes
app.use(cors({
  origin: [
    'http://localhost:5173', // pour dev local
    'https://cathy-y1j5-ddz4tflbq-cathys-projects-d856d899.vercel.app'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Middlewares
app.use('/uploads', express.static('uploads'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/products', productRoutes);

// Lancement serveur
app.listen(PORT, () => {
  console.log(`serveur s'execute sur http://localhost:${PORT}`);
});
