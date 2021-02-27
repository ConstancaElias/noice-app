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