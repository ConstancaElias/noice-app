var express = require('express');
var router = express.Router();
var axios = require('axios')

function verificaAutorizacao(req, res, next){
  if (req.user.level == "admin"){
    next()
  }
  else {
    res.status(401).jsonp({error: "Your authorization level doesn't allow to access this route"})
  }
}

module.exports = router;