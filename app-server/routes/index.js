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
          console.log("GOALS " + goals)
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


router.get('/tasksDone', function(req, res, next) {
  let token = req.cookies.token
  axios.get(apiServer + '/tasks/done?token=' + token)
        .then(data => {
          let tasks = data.data
          res.render('index', {view: "tasksDone", tasks: tasks})
        })
        .catch(e => console.log("[index] /myHomePage : error getting tasks -- " + e))
})

router.post('/goals', function(req, res) {

  let token = req.cookies.token

  axios.post(apiServer + '/goals/new?token=' + token, {"title": req.body.goal})
        .then(data => {
          res.redirect('/myHomePage')
        })
        .catch(e => console.log("[index] /myHomePage : error getting tasks -- " + e))
})

router.post('/tasks', function(req, res) {

  let token = req.cookies.token

  axios.post(apiServer + '/tasks/new?token=' + token, {"title": req.body.title, "description": req.body.description, "dueDate": req.body.dueDate})
        .then(data => {
          res.redirect('/myHomePage')
        })
        .catch(e => console.log("[index] /myHomePage : error getting tasks -- " + e))
})


router.post('/edit/goal/:id', (req, res) => {
    axios.put(apiServer + '/goals/edit/' + req.params.id + '?token=' + req.cookies.token , {"title": req.body.title})
        .then(data => 
          res.redirect('/myHomePage')
        )
        .catch(e => console.log("erro ao realizar update do recurso " + e))
})

router.post('/edit/task/:id', (req, res) => {
  axios.put(apiServer + '/tasks/edit/' + req.params.id + '?token=' + req.cookies.token , {"title": req.body.title, "description": req.body.description, "dueDate": req.body.dueDate})
      .then(data => 
        res.redirect('/myHomePage')
      )
      .catch(e => console.log("erro ao realizar update do recurso " + e))
})


router.get('/goals/delete/:id', function(req, res) {

  let token = req.cookies.token

  axios.delete(apiServer + '/goals/' + req.params.id + '?token=' + token)
        .then(data => {
          res.redirect('/myHomePage')
        })
        .catch(e => console.log("[index] /myHomePage : error getting tasks -- " + e))
})

router.get('/tasks/delete/:id', function(req, res) {

  let token = req.cookies.token

  axios.delete(apiServer + '/tasks/' + req.params.id + '?token=' + token)
        .then(data => {
          res.redirect('/myHomePage')
        })
        .catch(e => console.log("[index] /tasks/delete : error deleting tasks -- " + e))
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
