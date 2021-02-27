var express = require('express');
var router = express.Router();
var axios = require('axios')

const utils = require('../utils.js')
const apiServer = utils.apiServer
const authServer = utils.authServer
const appServer = utils.appServer

//------------------------------------------------------------------REGISTER

router.get(('/register'), function(req, res){
    res.render('index', {view: "register"})
})

router.post(('/register'), function(req, res){
  const username = req.body.username
  const mail = req.body.mail
  const password = req.body.password


  console.log("user" + username)

  axios.post(authServer + '/users/register', {"username": username, "mail": mail, "filiation": filiation, "password": password})
      .then(dados => {
          res.redirect(appServer + '/login')
      })
      .catch(e => {
          res.render('index', {view: "register", error: "Mail already in use! Please choose another!"})
          console.log('[login] /register : couldn\'t obtain token -- ' + e)
      })
  })
  
  //------------------------------------------------------------------LOGIN
  
  router.get('/', function(req, res, next) {
    res.render('index', {view: "login"})
  })
  
  router.post('/', function(req, res, next){
    var mail = req.body.mail;
    var password = req.body.password;
    console.log(mail + ' ' + password)
    
    axios.post('http://localhost:7003/users', {"mail": mail, "password": password})
      .then(dados => {
          var token = dados.data.token
          console.log('Token: ' + token + '\n\n')
  
          res.cookie('token', token, {
            secure: false, // set to true if your using https
            httpOnly: true,
          });
          res.redirect('http://localhost:7002/myHomePage')
         // res.send(token)
      })
      .catch(e => {
          res.render('index', {view: "login", error: "Incorrect mail address or password!"})
          console.log('[login] / couldn\'t obtain token -- ' + e)
      })
    
  })

module.exports = router;