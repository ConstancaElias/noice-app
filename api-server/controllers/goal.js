var Goal = require('../models/goal')


// Returns list goal
module.exports.list = ()=> {
    return Goal
        .find()
        .exec()
}


