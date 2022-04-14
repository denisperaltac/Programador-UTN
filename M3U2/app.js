var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var historiaRouter = require('./routes/historia');
var nosotrosRouter = require('./routes/nosotros')
var contactoRouter = require('./routes/contacto')

var app = express();

const hbs = require('hbs');

//this required before view engine setup
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerPartials(__dirname + '/views');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs')


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/historia', historiaRouter);
app.use('/nosotros', nosotrosRouter);
app.use('/contacto', contactoRouter);


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

// dotenv
require('dotenv').config();






module.exports = app;
