const express = require('express')
var router = express.Router();
const multer = require('multer')


var Goals = require('../controllers/goal')

  

router.get('/', (req, res) => {
    
    Goals.list()
    .then(data => {
        console.log("GOALS: " + data)
        res.status(201).json(data)
    })
    .catch(e => res.status(500).jsonp({err: e}))

})

router.post('/new', (req, res) => {
    var newGoal = {
        title: req.body.title,
        done: "false"   
    }   

    Goals.insert(newGoal)
    .then(data => {
        console.log(data)
        res.status(201).json(data)
    })
    .catch(e => res.status(500).jsonp({err: e}))

})

router.put('/edit/:id', (req, res) => {
    let newGoal = {
        _id: req.params.id,
        title: req.body.title
    }

    Goals.update(newGoal)
    .then(data => res.status(201).json(data))
    .catch(e => {
        console.log("[edit] couldn't update the resource")
        res.status(500).jsonp({err: e})
    })
})


router.delete('/:id', (req, res) => {

    Goals.delete(req.params.id)
    .then(data => {
        console.log(data)
        res.status(201).json(data)
    })
    .catch(e => res.status(500).jsonp({err: e}))

})



module.exports = router;