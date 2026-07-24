const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || 'https://aboutjavi.netlify.app',
  methods: ['POST'],
}));
app.use(express.json());

const emailLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: 'Demasiadas peticiones, inténtalo más tarde',
});

app.post('/api/send-email', emailLimiter, async (req, res) => {
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

  try {
    const info = await transporter.sendMail({
      from: `"${nombre}" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `Nuevo mensaje de ${nombre}`,
      text: `Nombre: ${nombre}\nCorreo: ${email}\nMensaje: ${mensaje}`,
    });
    console.log('Correo enviado:', info.response);
    res.status(200).send('Correo enviado correctamente');
  } catch (error) {
    console.error('Error enviando correo:', error.message);
    res.status(500).send('Error al enviar el correo');
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
