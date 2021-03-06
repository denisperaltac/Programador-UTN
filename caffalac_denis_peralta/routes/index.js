var express = require("express");
var router = express.Router();
var nodemailer = require("nodemailer");
var novedadesModel = require("../models/novedadesModel");
var cloudinary = require("cloudinary").v2;

/* GET home page. */
router.get("/", async function (req, res, next) {
  var novedades = await novedadesModel.getNovedades();

  novedades = novedades.splice(0, 4);
  novedades = novedades.map((novedad) => {
    if (novedad.img_id) {
      const imagen = cloudinary.url(novedad.img_id, {
        width: 460,
        crop: "fill",
      });
      return {
        ...novedad,
        imagen,
      };
    } else {
      return {
        ...novedad,
        imagen: "/images/noimage.jpg",
      };
    }
  });

  res.render("index", {
    novedades,
  });
});

router.post("/", async (req, res, next) => {
  var nombre = req.body.nombre;
  var apellido = req.body.apellido;
  var email = req.body.email;
  var mensaje = req.body.mensaje;

  if (req.body.tel != "") {
    var tel = "<br>Teléfono: " + req.body.tel;
  } else {
    var tel = ".";
  }

  var obj = {
    to: "denisperaltac@gmail.com",
    subject: "CONTACTO DESDE LA WEB CAFFITO",
    html:
      nombre +
      " " +
      apellido +
      " se contacto a través de la web." +
      "<br>Email: " +
      email +
      tel +
      "<br>Dejo el siguiente mensaje: " +
      mensaje,
  };

  var transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "ba4387efc019d5",
      pass: "6ca8bd8f746d5f",
    },
  });

  var info = await transport.sendMail(obj);

  res.render("index", {
    message: "Mensaje enviado correctamente",
  });
});

module.exports = router;
