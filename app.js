'use strict'

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session')
var cors = require('cors');

// routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth/authorization');
var cardsRouter = require('./routes/cards');

//init server
var nova = require('./services/nova');
var novadb = require('./services/db');


var connectpromise = new Promise((resolve, reject) => {
  novadb.connect((err)=>{
    if(err){
      console.log(err)
    }
    resolve(novadb.getdb())
  })
  
})

//// init creating the collections validate we are going to use ///////
connectpromise.then((db) => {
  console.log('@@@@@@@ Nova config@@@@@@@@@')
  console.log(nova.config)
  console.log('@@@@@@@ Nova app ready @@@@@@@@@')
})
connectpromise.catch((err) => {
  if(err) console.log('[x] something with the data base went wrong!!')
})
///////////////////////////////////////////////////////////////////////


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');



app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'todo-nova',
  resave: true,
  saveUninitialized: true,
  cookie: { 
    path: '/auth/login',
    secure: false,
    maxAge: 24 * 60 * 60 * 1000,
  }
}))

app.use(function(req, res, next){
  //check if request session exits
  if(req.session && req.session.user){
    dbaservice.db.collection('users').findOne({name: req.session.user.name}, (err, user) =>{
      if(user){
        req.user = user
        delete req.user.password // delete password from the session
        req.session.user = user // refresh the session value
        res.locals.user = user
        // finishing processing the middleware and run the route
        next()
      } 
    })
  } else {
    next()
  }
})


app.use(cors());
// headers config 
app.use(function (req, res, next) {
  //set headers to allow cross origin request.
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Credentials", true);
  next();
});


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth',authRouter);
app.use('/cards',cardsRouter);


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

