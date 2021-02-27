const express = require('express')
var router = express.Router();
const multer = require('multer')

var Goals = require('../controllers/goal')
  
router.get('/', (req, res) => {
    console.log("HEY! I'm in GOALS")
    Goals.list()
    .then(data => {
        console.log(data)
        res.status(201).json(data)
    })
    .catch(e => res.status(500).jsonp({err: e}))

})

module.exports = router;