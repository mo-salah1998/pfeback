require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');
var clientRouter = require('./routes/client');
var orderRouter = require('./routes/order');
var partnerRouter = require('./routes/partner');
var app = express();
swaggerJsdoc = require("swagger-jsdoc"),
    swaggerUi = require("swagger-ui-express");
//data base connexion
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true , useUnifiedTopology: true,useCreateIndex: true })
const db = mongoose.connection

db.on('error', (error) => console.log(error))
db.once('open', () => console.log('Connection to database opened'))
// end data base connexion

//swagger ui
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "PFE API",
      version: "1.0.0",
      description:
          "This is a simple API application made with Express and documented with Swagger",
    },
    servers: [
      {
        url: "http://localhost:4000",
      },
    ],
  },
  securityDefinitions: {
    jsonWebToken: {
      type: "apiKey",
      in: "header",
      name: "Authorization"
    }
  },
  apis: ["./routes/*.js"],
};
const specs = swaggerJsdoc(options);
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs, { explorer: true }) //, { explorer: true } //Add search bar
);

// end swagger ui
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);
app.use('/api/client', clientRouter);
app.use('/api/order', orderRouter);
app.use('/api/partner', partnerRouter);


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
