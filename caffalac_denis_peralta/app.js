var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

require("dotenv").config();
var session = require("express-session");

var fileUpload = require("express-fileupload");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var loginRouter = require("./routes/admin/login");
var adminRouter = require("./routes/admin/novedades");

var app = express();
const hbs = require("hbs");

//this required before view engine setup
hbs.registerPartials(__dirname + "/views/partials");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(
  session({
    secret: "12w45qe1qe4q1eq54eq5",
    resave: false,
    saveUninitialized: true,
  })
);

secured = async (req, res, next) => {
  try {
    //console.log(req.session.id_usuario);
    if (req.session.id_usuario) {
      next();
    } else {
      res.redirect("/admin/login");
    }
  } catch (error) {
    console.log(error);
  }
};

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/admin/login", loginRouter);
app.use("/admin/novedades", secured, adminRouter);

//Manejo Base de Datos

// SELECT

// pool.query("select * from usuarios").then(function (resultados) {
//   console.log(resultados);
// });

// INSERT

// var obj = {
//   name: 'Denis',
//   last_name: 'Peralta',
//   email: 'denisperaltac@gmail.com',
//   password: 'Caffalac12345'
// }

// pool.query('insert into users set ?', [obj]).then(function (resultados) {
//   console.log(resultados)
// })

// var obj = {
//   name: 'Lionel',
//   last_name: 'Messi',
//   email: 'lioMessi@gmail.com',
//   password: 'Barcelona2019'
// }

// pool.query('insert into users set ?', [obj]).then(function (resultados) {
//   console.log(resultados)
// })

//Como guarde dos veces se me crearon dos Messi

// DELETE

// var id = 2;

// pool.query('delete from users where id_users=?', [id]).then(function(resultados) {
//   console.log(resultados);
// })

// UPDATE

// var id = 3;
// var obj = {
//   id_users: 2
// }

// pool.query('update users set ? where id_users=?', [obj, id]).then(function (resultados) {
//   console.log(resultados);
// })

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
