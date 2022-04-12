var express = require('express');
var router = express.Router();
var nodemailer = require("nodemailer");

router.post('/', async(req, res, next) => {
  var nombre = req.body.nombre;
  var apellido = req.body.apellido;
  var email = req.body.email;
  var telefono = req.body.telefono;
  var mensaje = req.body.mensaje;

  var obj = {
    to: 'denisperaltac@gmail.com',
    subject: 'CONTACTO WEB',
    html: nombre + ' ' + apellido + "se contacto a través de la web con su correo: " + email + ". <br> Además, hizo este comentario: " + mensaje + ". <br> Su teléfono es: " + telefono
  }

  var transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  var info = await transport.sendMail(obj);

  res.render('contacto', {
    message: 'Mensaje enviado correctamente'
  });
});



/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('Contacto');
});

module.exports = router;
