require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');

const Order = require('./models/Order');
const Product = require('./models/Selling/Product');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');
var clientRouter = require('./routes/client');
var orderRouter = require('./routes/order');
var partnerRouter = require('./routes/partner');
var emailRouter = require('./routes/email');
var dashbordRouter = require('./routes/dashbord');
var app = express();
swaggerJsdoc = require("swagger-jsdoc"),
    swaggerUi = require("swagger-ui-express");
//data base connexion
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true , useUnifiedTopology: true,useCreateIndex: true })
const db = mongoose.connection

db.on('error', (error) => console.log(error))
db.once('open',async () => {
  console.log('Connection to database opened')
  //if(await Product.countDocuments().exec()>0)return;
  //Promise.all([
  //    Product.create({name: "productTest1",basePrice:50,mainImage:"img.jpeg",description:"c'est une petit discription",shortDescription:"c'est une petit discription",date:4/28/2020}),
  //    Product.create({name: "productTest2",basePrice:50,mainImage:"img.jpeg",description:"c'est une petit discription",shortDescription:"c'est une petit discription",date:4/28/2020}),
  //    Product.create({name: "productTest3",basePrice:50,mainImage:"img.jpeg",description:"c'est une petit discription",shortDescription:"c'est une petit discription",date:4/28/2020}),
  //    Product.create({name: "productTest4",basePrice:50,mainImage:"img.jpeg",description:"c'est une petit discription",shortDescription:"c'est une petit discription",date:4/28/2020}),
  //    Product.create({name: "productTest5",basePrice:50,mainImage:"img.jpeg",description:"c'est une petit discription",shortDescription:"c'est une petit discription",date:4/28/2020}),
  //    Product.create({name: "productTest6",basePrice:50,mainImage:"img.jpeg",description:"c'est une petit discription",shortDescription:"c'est une petit discription",date:4/28/2020}),
  //    Product.create({name: "productTest7",basePrice:50,mainImage:"img.jpeg",description:"c'est une petit discription",shortDescription:"c'est une petit discription",date:4/28/2020}),
  //    Product.create({name: "productTest8",basePrice:50,mainImage:"img.jpeg",description:"c'est une petit discription",shortDescription:"c'est une petit discription",date:4/28/2020}),
  //    Product.create({name: "productTest9",basePrice:50,mainImage:"img.jpeg",description:"c'est une petit discription",shortDescription:"c'est une petit discription",date:4/28/2020}),
  //    Product.create({name: "productTest10",basePrice:50,mainImage:"img.jpeg",description:"c'est une petit discription",shortDescription:"c'est une petit discription",date:4/28/2020}),
  //   // Order.create({client:"6065a0453e0ff9325c1740ca",price:500,phone:"99404229",items[]})
  //]).then(()=>console.log("produits ajouter"))
  if(await Order.countDocuments().exec()>0)return;
  Promise.all([
      Order.create({client:"6065a0453e0ff9325c1740ca",price:500,phone:"99404229",items:[{product:"6089450011170564a3ee28e9",quantity:3},{product:"6089450011170564a3ee28ec",quantity:2}]}),
      Order.create({client:"6065a0453e0ff9325c1740ca",price:300,phone:"98404229",items:[{product:"6089450011170564a3ee28e9",quantity:1},{product:"6089450011170564a3ee28ec",quantity:2}]}),
      Order.create({client:"6065a0453e0ff9325c1740ca",price:200,phone:"98504229",items:[{product:"6089450011170564a3ee28e9",quantity:4},{product:"6089450011170564a3ee28ec",quantity:2}]}),
      Order.create({client:"6065a0453e0ff9325c1740ca",price:200,phone:"98504229",items:[{product:"6089450011170564a3ee28e9",quantity:4},{product:"6089450011170564a3ee28ec",quantity:2}]}),
      Order.create({client:"6065a0453e0ff9325c1740ca",price:200,phone:"98504229",items:[{product:"6089450011170564a3ee28e9",quantity:4},{product:"6089450011170564a3ee28ec",quantity:2}]}),
      Order.create({client:"6065a0453e0ff9325c1740ca",price:200,phone:"98504229",items:[{product:"6089450011170564a3ee28e9",quantity:4},{product:"6089450011170564a3ee28ec",quantity:2}]}),
      ]).then(()=>console.log("orders ajouter"))
})
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
app.use('/api/email', emailRouter);
app.use('/api/dashbord', dashbordRouter);


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
