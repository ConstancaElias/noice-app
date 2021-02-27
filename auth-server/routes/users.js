var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken')
var fs = require('fs')
const path = require("path");


var proxy = require('express-http-proxy');

const User = require('../controllers/user');
const { use } = require('../../api-server/routes');
 

const privateRsaKey = fs.readFileSync(path.resolve(__dirname, '../private_key.pem'), 'utf8');


/*
 O utilizador autentica-se com username e passwd.
 Se as credenciais estiverem corretas um token é gerado e enviado como resposta.
*/

/*
router.get('/', function(req, res, next) {
  res.render('index', {title: "hey"})
})
*/

router.post('/', function(req, res, next) {
  console.log(req.body)
  var mail = req.body.mail
  var password = req.body.password
  console.log("Hello " + mail + " " + password)

  User.get(mail)
  .then(data => {
    if (data.password == password)
      jwt.sign({ mail: data.mail, level: data.level}, privateRsaKey, {
        expiresIn: 100000000,
        algorithm: "RS256"
      },
      function(e, token) {
      if(e) {
        res.status(500).jsonp({error: e})
      }
      else {
        console.log("Hey there!!")
        res.status(201).jsonp({token: token})
        
      }
    
    })
    else {
      res.status(500).send("Wrong pass")
    }
  })
  .catch(e => {
    console.log("User doesn't exist")
    res.status(500).jsonp({error: e})
    
  })
 
});


router.get('/consult', function(req, res, next) {
  User.list()
  .then(data => {res.status(201).json(data)})
  .catch(e => res.status(500).jsonp({error: e}))
})


router.post('/updateLevel', function(req, res, next) {
  User.updateLevelProducer(req.body.id_producer)
  .then(data => {console.log("DATA " + data); res.status(201).json(data)})
  .catch(e => res.status(500).jsonp({error: e}))
})

router.post('/register', function(req, res, next) {
  console.log(req.body)
  var username = req.body.username
  var mail = req.body.mail
  var filiation = req.body.filiation
  var password = req.body.password


  let currentDate = new Date()

  let newUser = {
    name: username,
    mail: mail,
    level: "consumer",
    password: password
  }

  User.get(newUser.mail)
    .then(data => {
      //if there is no user with the same mail address as the new register
      if(!data) {
        User.insert(newUser)
        .then(data => {
            jwt.sign({ mail: data.mail, level: data.level}, privateRsaKey, {
              expiresIn: 30,
              algorithm: "RS256"
            },
            function(e, token) {
            if(e) {
              res.status(500).jsonp({error: e})
            }
            else {
              res.status(201).jsonp({token: token})
              
            }
          })
        })
        .catch(e => res.render('error', {myMessage: "Couldn't insert user"}))
      }
      else {
        res.status(500).jsonp({error: data, message: "Mail already in use! Please choose another."})
      }
    })
    .catch(e => res.status(500).jsonp({error: data, message: "Couldn't get info from users db|"}))
    
});

router.get('/logout', function(req, res) {
  blacklist.revoke(req.user)
  res.sendStatus(200);
})

router.post('/list', function(req,res){
  User.getList(req.body.usersList)
    .then(data => {console.log("DATA " + data); res.status(201).json(data)})
    .catch(e => res.status(500).jsonp({error: e}))
})

router.get('/:user', function(req, res, next) {
  User.get(req.params.user)
    .then(data => {console.log("DATA " + data); res.status(201).json(data)})
    .catch(e => res.status(500).jsonp({error: e}))
})


router.post('/:user', function(req, res, next) {
  User.get(req.params.user)
    .then(data => {console.log("DATA " + data); res.status(201).json(data)})
    .catch(e => res.status(500).jsonp({error: e}))
})
module.exports = router;
