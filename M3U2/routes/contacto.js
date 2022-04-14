var express = require('express');
var router = express.Router();
var nodemailer = require("nodemailer");

console.log(req.body)

router.post('/', async(req, res, next) => {
  var nombre = req.body.nombre;
  var apellido = req.body.apellido;
  var email = req.body.email;
  var tel = req.body.telefono;
  var mensaje = req.body.mensaje;


  var obj = {
    to: 'denisperaltac@gmail.com',
    subject: 'CONTACTO DESDE LA WEB CAFFITO',
    html:"se contacto a través de la web con su correo: "
  }

  var transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "ba4387efc019d5",
      pass: "6ca8bd8f746d5f"
    }
  });

  var info = await transport.sendMail(obj);

  res.render('index', {
    message: 'Mensaje enviado correctamente'
  });
});
sadas


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('Contacto');
});

module.exports = router;
