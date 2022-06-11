var express = require("express");
var router = express.Router();
var novedadesModel = require("../../models/novedadesModel");
var util = require("util");
var cloudinary = require("cloudinary").v2;

var uploader = util.promisify(cloudinary.uploader.upload);
const destroy = util.promisify(cloudinary.uploader.destroy);

router.get("/", async function (req, res, next) {
  var novedades = await novedadesModel.getNovedades();

  novedades = novedades.map((novedad) => {
    if (novedad.img_id) {
      const imagen = cloudinary.image(novedad.img_id, {
        width: 80,
        height: 80,
        crop: "fill",
      });
      return {
        ...novedad,
        imagen,
      };
    } else {
      return {
        ...novedad,
        imagen: " ",
      };
    }
  });

  res.render("admin/novedades", {
    layout: "admin/layout",
    usuario: req.session.nombre,
    novedades,
  });
});

// Para Eliminar
router.get("/eliminar/:id", async (req, res, next) => {
  var id = req.params.id;

  let novedad = await novedadesModel.getNovedadById(id);
  if (novedad.img_id) {
    await destroy(novedad.img_id);
  }

  await novedadesModel.borrarNovedades(id);
  res.redirect("/admin/novedades");
});

// Para Agregar

router.get("/agregar", (req, res, next) => {
  res.render("admin/agregar", {
    layout: "admin/layout",
  });
});

// Agregar cuando toco el button

router.post("/agregar", async (req, res, next) => {
  try {
    var img_id = "";
    if (req.files && Object.keys(req.files).length > 0) {
      imagen = req.files.imagen;
      img_id = (await uploader(imagen.tempFilePath)).public_id;
    }

    if (
      req.body.titulo != "" &&
      req.body.subtitulo != "" &&
      req.body.cuerpo != ""
    ) {
      await novedadesModel.insertarNovedades({ ...req.body, img_id });
      res.redirect("/admin/novedades");
    } else {
      res.render("admin/agregar", {
        layout: "admin/layout",
        error: true,
        message: "No pudimos realizar la solucitud.",
      });
    }
  } catch (error) {
    console.log(error);
  }
});

// Para Editar

router.get("/editar/:id", async (req, res, next) => {
  var id = req.params.id;
  var novedad = await novedadesModel.getNovedadById(id);

  res.render("admin/editar", {
    layout: "admin/layout",
    novedad,
  });
});

// Editar cuando toco el button

router.post("/editar", async (req, res, next) => {
  try {
    let img_id = req.body.img_original;
    let borrar_img_vieja = false;

    if (req.body.img_delete === "1") {
      img_id = null;
      borrar_img_vieja = true;
    } else {
      if (req.files && Object.keys(req.files).length > 0) {
        imagen = req.files.imagen;
        img_id = (await uploader(imagen.tempFilePath)).public_id;
        borrar_img_vieja = true;
      }
    }
    if (borrar_img_vieja && req.body.img_original) {
      await destroy(req.body.img_original);
    }

    var obj = {
      titulo: req.body.titulo,
      subtitulo: req.body.subtitulo,
      cuerpo: req.body.cuerpo,
      img_id,
    };

    await novedadesModel.editarNovedades(obj, req.body.id);
    res.redirect("/admin/novedades");
  } catch (error) {
    console.log(error);

    res.render("admin/editar", {
      layout: "admin/layout",
      error: true,
      message: "No pudimos realizar la solucitud.",
    });
  }
});

module.exports = router;
