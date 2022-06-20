var pool = require("./db");

async function getNovedades() {
  var query = "SELECT * from novedades";
  var rows = await pool.query(query);
  return rows;
}
async function borrarNovedades(id) {
  var query = "DELETE from novedades WHERE id=?";
  var rows = await pool.query(query, [id]);
  return rows;
}

async function insertarNovedades(obj) {
  try {
    var query = "INSERT into novedades SET ?";
    var rows = await pool.query(query, [obj]);
    return rows;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function getNovedadById(id) {
  var query = "SELECT * from novedades WHERE id = ?";
  var rows = await pool.query(query, [id]);
  return rows[0];
}

async function editarNovedades(obj, id) {
  try {
    var query = "UPDATE novedades SET ? WHERE id = ?";
    var rows = await pool.query(query, [obj, id]);
    return rows;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function buscarNovedades(busqueda) {
  var query =
    "select * from novedades where titulo like ? OR subtitulo like ? OR cuerpo like ?";
  var rows = await pool.query(query, [
    "%" + busqueda + "%",
    "%" + busqueda + "%",
    "%" + busqueda + "%",
  ]);
  return rows;
}

module.exports = {
  getNovedades,
  borrarNovedades,
  insertarNovedades,
  getNovedadById,
  editarNovedades,
  buscarNovedades,
};
