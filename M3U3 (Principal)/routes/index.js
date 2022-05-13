var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Caffito' });
});

router.post('/', async(req, res, next) => {
  var nombre = req.body.nombre;
  var apellido = req.body.apellido;
  var email = req.body.email;
  // if (req.body.telefono != '') {
  // var tel = ' y su número de teléfono ' + req.body.tel + '. ';
  // }
  
  if(req.body.tel != '') {
    var tel = '<br>Teléfono: ' + req.body.tel;
  } else {var tel = '.'}
  var mensaje = req.body.mensaje;

  var obj = {
    to: 'denisperaltac@gmail.com',
    subject: 'CONTACTO DESDE LA WEB CAFFITO',
    html: nombre + ' ' + apellido + ' se contacto a través de la web.' + '<br>Email: ' + email + tel + '<br>Dejo el siguiente mensaje: ' + mensaje
  }

  var transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS 
    }
  })

  var info = await transporter.sendMail(obj);

  res.render("index", {
    message: "Mensaje enviado correctamente",
  });
  
});
  
module.exports = router;
