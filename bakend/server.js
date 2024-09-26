const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors()); // Permitir solicitudes desde cualquier origen (útil para conectar con tu frontend)
app.use(express.json()); // Para analizar el cuerpo de las solicitudes JSON

// Ruta para enviar correos
app.post('/api/send-email', (req, res) => {
  const { email, nombre, mensaje } = req.body;

  // Configuración de Nodemailer
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'javierrojocanton@gmail.com',
      pass: 'scgu azsg mtsz fitg'
    }
  });

  let mailOptions = {
    from: email,
    to: 'javierrojocanton@gmail.com',
    subject: `Nuevo mensaje de ${nombre}`,
    text: mensaje
  };

  // Enviar el correo
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.status(500).send('Error al enviar el correo');
    } else {
      console.log('Correo enviado: ' + info.response);
      res.status(200).send('Correo enviado correctamente');
    }
  });
});

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
