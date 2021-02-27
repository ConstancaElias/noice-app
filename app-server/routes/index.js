var express = require('express');
var router = express.Router();
var axios = require("axios")
const jwt_decode = require('jwt-decode');

const utils = require('../utils.js')
const apiServer = utils.apiServer;
const authServer = utils.authServer;


// GET login 
router.get('/', function(req, res, next) {
  res.redirect('/login')
});


//GET HomePage
router.get('/myHomePage', function(req, res, next) {

  if(req.cookies.token) {

    let token = req.cookies.token

    axios.get(apiServer + '/goals?token=' + token)
    .then(data => {

      let goals = data.data
      axios.get(apiServer + '/tasks?token=' + token)
        .then(data => {

          let tasks = data.data
          res.render('index', {view: "initial", user: req.user, tasks: tasks, goals: goals})

        })
        .catch(e => console.log("[index] /myHomePage : error getting tasks -- " + e))
    })
    .catch(e => {
      
        console.log("[index /myHomePage] Couldn't obtain data")
        res.render('myError', {view: "error", e: e})
      
    })  
   
  }
  else {
    res.render('myError', {view: "noSession"})
  }
  
})


router.get('/notToForget', function(Req, res, next) {
  /*
    what do we want here?? tasks? goals?
  */
  res.render('index', {view: "notToForget"})
})


router.get('/tasks/done', function(Req, res, next) {
  axios.get(apiServer + '/tasksDone?token=' + token)
        .then(data => {
          let tasks = data.data
          res.render('index', {view: "tasksDone", tasks: tasks})
        })
        .catch(e => console.log("[index] /myHomePage : error getting tasks -- " + e))
})


router.get('/logout', function(Req, res, next) {
  res.clearCookie('token')
  res.redirect('/')
})


//GET Profile
router.get('/profile', function(req, res, next) {
  
  //get user mail
  var token = req.cookies.token
  var decoded = jwt_decode(token);
  let userMail = decoded['mail']
  //----------------------

  if(req.query.user) {
    userMail = req.query.user
  }

  axios.post(authServer + '/users/' + userMail)
  .then(data => {
    var user = data.data
    res.render("index", {view: "profile", user: user})
    
  })
  .catch(e => console.log("[index] /logout : error getting user data -- " + e))
})


module.exports = router;
