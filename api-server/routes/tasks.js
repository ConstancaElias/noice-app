const express = require('express')
var router = express.Router();
const multer = require('multer')


var Tasks = require('../controllers/task')

  

router.get('/', (req, res) => {
    
    Tasks.list()
    .then(data => {
        console.log(data)
        res.status(201).json(data)
    })
    .catch(e => res.status(500).jsonp({err: e}))

})

router.get('/done', (req, res) => {

     Tasks.listDone()
     .then(data => {
         console.log(data)
         res.status(201).json(data)
     })
     .catch(e => res.status(500).jsonp({err: e}))
 
 })

router.put('/edit/done/:id', (req, res) => {

    Tasks.updateDone(req.params.id)
    .then(data => res.status(201).json(data))
    .catch(e => {
        console.log("[edit] couldn't update the resource")
        res.status(500).jsonp({err: e})
    })
})

router.put('/edit/:id', (req, res) => {
    let newTask = {
        id: req.params.id,
        title: req.body.title,
        description: req.body.description,
        dueDate: req.body.dueDate
    }
    console.log("NEW TASK: " + newTask.title +' ' + newTask.description + ' ' + newTask.dueDate)
    Tasks.update(newTask)
    .then(data => res.status(201).json(data))
    .catch(e => {
        console.log("[edit] couldn't update the resource")
        res.status(500).jsonp({err: e})
    })
})



router.delete('/:id', (req, res) => {

    Tasks.delete(req.params.id)
    .then(data => {
        console.log(data)
        res.status(201).json(data)
    })
    .catch(e => res.status(500).jsonp({err: e}))

})

router.post('/new', (req, res) => {
    var newTask = {
        title: req.body.title,
        description: req.body.description,
        dueDate: req.body.dueDate   
    }   

    Tasks.insert(newTask)
    .then(data => {
        console.log(data)
        res.status(201).json(data)
    })
    .catch(e => res.status(500).jsonp({err: e}))

})

router.delete('/:id', (req, res) => {

    Tasks.delete(req.params.id)
    .then(data => {
        console.log(data)
        res.status(201).json(data)
    })
    .catch(e => res.status(500).jsonp({err: e}))

})

router.post('/new', (req, res) => {

    Tasks.delete(req.params.id)
    .then(data => {
        console.log(data)
        res.status(201).json(data)
    })
    .catch(e => res.status(500).jsonp({err: e}))

})



module.exports = router;