var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var jwt = require('jsonwebtoken')
var mongoose = require('mongoose')
const fs = require('fs')



//---------------------------------------------------------MONGO CONNECTION

//var mongoDB = 'mongodb://127.0.0.1/users';
//mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

//Get the default connection
//var db = mongoose.connection;

//Set up default mongoose connection
// Para depois na parte dos controladores faz-se mongoose.conection.use(//basededadosausar)

var mongoDB = 'mongodb://127.0.0.1/default';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

//Get the default connection
var db = mongoose.connection;


//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error...'));
db.once('open', function() {
    console.log("Connection to MongoDB succeded...")
});

//-------------------------------------------------------------------------

var tasksRouter = require('./routes/tasks')
var goalsRouter = require('./routes/goals')
var moodRouter = require('./routes/mood')

const e = require('express');

const publicRsaKey = fs.readFileSync(path.join(__dirname, '../auth-server/public_key.pem'), 'utf8')


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


//---------------------------------------------------------AUTHENTICATED AREA

//passa para baixo quando o token foi verificado e é válido
app.use(function(req, res, next) {
  
  if (req.query.token){
    var token = req.query.token

    try{
      console.log("TOKEN AUTH: " + token)
    }
    catch{
      console.log("TOKEN AUTH ERROR ")
    }
    jwt.verify(token, publicRsaKey, function(e, payload){
        if (e) res.status(401).jsonp({error: e})
        else{
          //guardar o resultado de ter verificado o token
          req.user = {
            username: payload.username,
            level: payload.level
          }  
          next()
        }
    })
    
  }
  else {
    res.status(401).jsonp({erro: "There is no token!"})
  }
  //401 - unauthorized
})


app.use('/goals', goalsRouter)
app.use('/tasks', tasksRouter)
app.use('/mood', moodRouter)


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
  res.status(err.status || 500).jsonp({error: err.message})
});

module.exports = app;
