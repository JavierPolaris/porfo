const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || 'https://aboutjavi.netlify.app',
  methods: ['POST'],
}));
app.use(express.json());

app.post('/api/send-email', (req, res) => {
  const { email, nombre, mensaje } = req.body;

  if (!email || !nombre || !mensaje) {
    return res.status(400).send('Faltan campos requeridos');
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"${nombre}" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    replyTo: email,
    subject: `Nuevo mensaje de ${nombre}`,
    text: `Nombre: ${nombre}\nCorreo: ${email}\nMensaje: ${mensaje}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error enviando correo:', error.message);
      return res.status(500).send('Error al enviar el correo');
    }
    console.log('Correo enviado:', info.response);
    res.status(200).send('Correo enviado correctamente');
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
