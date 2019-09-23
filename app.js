//All requires
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require("express-session")
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var mongoose = require("mongoose");
var MongoStore = require('connect-mongo')(session);
var passport = require('passport');

//requiring the env file
var dotenv = require("dotenv");

//Extracting the env file
dotenv.config();

//connection with database
mongoose.connect("mongodb://localhost/info", {useNewUrlParser:true}, (err) => {
  err ? console.log(err) : console.log("mongodb connected")
});

//require passport.js
require('./modules/passport');

//mounting the express-app
var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//creating the sessions as middleware
app.use(session({
  secret:"xyz",//up level security for after salt in schema
  resave: true,//use to save info of the same user
  saveUninitialized:  true,
  store: new MongoStore({mongooseConnection: mongoose.connection})//used to save sessions in the mongoose database so after stopping the server it does not deleted
}));
app.use(passport.initialize());

// Handling the route paths
app.use('/', indexRouter);
app.use('/users', usersRouter);

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
// Exporting the router
module.exports = app;
