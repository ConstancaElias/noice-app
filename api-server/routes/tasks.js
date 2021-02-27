const express = require('express')
var router = express.Router();
const multer = require('multer')


var Tasks = require('../controllers/task')

  

router.get('/', (req, res) => {
   console.log("I'm im get/tasks")
    Tasks.list()
    .then(data => {
        console.log(data)
        res.status(201).json(data)
    })
    .catch(e => res.status(500).jsonp({err: e}))

})


module.exports = router;