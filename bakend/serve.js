// backend/server.js
const express = require('express');
const cors = require('cors');
const emailRoutes = require('./routes/emailRoutes'); // Archivo de rutas

const app = express();

// Middleware
app.use(cors()); // Para permitir peticiones desde el frontend
app.use(express.json()); // Para procesar datos en formato JSON

// Usar las rutas
app.use('/api', emailRoutes); // Ruta para el envío de correos

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
