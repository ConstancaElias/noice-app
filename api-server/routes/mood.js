const express = require('express')
var router = express.Router();
const multer = require('multer')


var Moods = require('../controllers/mood')


router.post('/new', (req, res) => {

    console.log(req)
    
    var newMood = {
        option: req.body.mood
    }   

    Mood.insert(newMood)
    .then(data => {
        console.log(data)
        res.status(201).json(data)
    })
    .catch(e => res.status(500).jsonp({err: e}))

})