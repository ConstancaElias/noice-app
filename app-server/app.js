var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var jwt = require('jsonwebtoken')
var fs = require('fs')

var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter)
app.use('/login', loginRouter);

//---------------------------------------------------------AUTHENTICATED AREA
app.use(cookieParser());

const publicRsaKey = fs.readFileSync(path.resolve(__dirname, '../auth-server/public_key.pem'), 'utf8')


/*
app.get('/logout', function(req, res) {
  console.log("Hi there")
  console.log(req.cookies)
  res.clearCookie();
  console.log(res.cookies)
  res.redirect('/');
*/
  /*
  blacklist.revoke(req.user, function(e, data) {
    if (e) {
      res.render('myError', {view: "noSession"})
    }
    else {
      res .redirect('/')
    }
  }) */



//passa para baixo quando o token foi verificado e é válido
app.use(function(req, res, next) {
  if (req.cookies.token){
    var token = req.cookies.token

    jwt.verify(token, publicRsaKey, function(e, payload){
        if (e) {
          console.log("SESSION EXPIRED 1")
          res.render('myError', {view: "sessionExpired"})
        }
        else{
          //guardar o resultado de ter verificado o token
          req.user = {
            mail: payload.mail,
            level: payload.level
          }  
          next()
        }
    })
    
  }
  else {
    //res.status(401).jsonp({erro: "There is no token!"})
    res.render('myError', {view: "noSession"})
  }
})

//-----------------------------------------------------------------------------------

app.use('/', indexRouter);
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
