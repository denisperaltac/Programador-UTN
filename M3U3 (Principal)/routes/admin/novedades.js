var express = require("express");
var router = express.Router();
var novedadesModel = require("../../models/novedadesModel");

router.get("/", async function (req, res, next) {
  var novedades = await novedadesModel.getNovedades();

  res.render("admin/novedades", {
    layout: "admin/layout",
    usuario: req.session.nombre,
    novedades,
  });
});

// Para Eliminar
router.get("/eliminar/:id", async (req, res, next) => {
  var id = req.params.id;
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
    await novedadesModel.insertarNovedades(req.body);
    res.redirect("/admin/novedades");
  } catch (error) {
    console.log(error);

    res.render("admin/agregar", {
      layout: "admin/layout",
      error: true,
      message: "No pudimos realizar la solucitud.",
    });
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
    var obj = {
      titulo: req.body.titulo,
      subtitulo: req.body.subtitulo,
      cuerpo: req.body.cuerpo,
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
