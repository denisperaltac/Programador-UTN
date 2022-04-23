var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var session = require('express-session')

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
const { Session } = require('inspector');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'sdfrefdgtrfdesdcfgtr',
    resave: false,
    saveUninitialized: true
}));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

app.get('/', function (req, res) {
  var conocido = Boolean(req.session.nombre);

  res.render('index', {
    title: 'Sesiones en Express.js',
    conocido: conocido,
    nombre: req.session.nombre
  });
});

app.post('/ingresar', function (req, res) {
  if (req.body.nombre) {
    req.session.nombre = req.body.nombre 
  }
  res.redirect('/');
});

app.get('/salir', function(req, res) {
  req.session.destroy();
  res.redirect('/');
});

app.use(function(req, res, next) {
  // Si no existe la variable de sesion vistas la creamos como un objeto vacio
  if (!req.session.vistas) {
    req.session.vistas = {};
  }

  // Buscamos una clave dentro de session.vistas que concida con la url actual. Si no existe la inicializamos en 1. Si existe sumamos 1 al contador de esa ruta
  if(!req.session.vistas[req.originalUrl]) {
    req.session.vistas[req.originalUrl] = 1;
  } else {
    req.session.vistas[req.originalUrl]++;
  }

  next();
})

app.get('/contacto', function(req,res) {
  // Pasamos al template la variable vistas con el número devuelto por la clave que pedimos
  res.render('pagina', {
    nombre: 'contacto',
    vistas: req.session.vistas[req.originalUrl]
  });
});

app.get('/nosotros', function(req,res) {
  // Pasamos al template la variable vistas con el número devuelto por la clave que pedimos
  res.render('pagina', {
    nombre: 'nosotros',
    vistas: req.session.vistas[req.originalUrl]
  });
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
