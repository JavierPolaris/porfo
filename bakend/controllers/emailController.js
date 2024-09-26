const nodemailer = require('nodemailer');

// Función para enviar correo
const sendEmail = (req, res) => {
  const { email, nombre, mensaje } = req.body;

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'ktmdemonia@gmail.com',
      pass: 'Afrotuko1'
    }
  });

  let mailOptions = {
    from: email,
    to: 'ktmdemonia@gmail.com',
    subject: `Nuevo mensaje de ${nombre}`,
    text: mensaje
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.status(500).send('Error al enviar el correo');
    } else {
      console.log('Correo enviado: ' + info.response);
      res.status(200).send('Correo enviado correctamente');
    }
  });
};

module.exports = { sendEmail };
