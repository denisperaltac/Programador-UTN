var pool = require("./db");

async function getNovedades() {
  var query = "select * from novedades";
  var rows = await pool.query(query);
  return rows;
}
async function borrarNovedades(id) {
  var query = "delete from novedades where id=?";
  var rows = await pool.query(query, [id]);
  return rows;
}

async function insertarNovedades(obj) {
  try {
    var query = "insert into novedades set ?";
    var rows = await pool.query(query, [obj]);
    return rows;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function getNovedadById(id) {
  var query = "select * from novedades where id=?";
  var rows = await pool.query(query, [id]);
  return rows[0];
}

// async function editarNovedades(obj) {
//   try {
//     var query = "UPDATE novedades SET titulo = ?, subtitulo = "xx", cuerpo = "xxx" WHERE id = ?";
//     var rows = await pool.query(query, [obj]);
//     return rows;
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// }

module.exports = {
  getNovedades,
  borrarNovedades,
  insertarNovedades,
  getNovedadById,
};
