var Schedule = require('../models/schedule')

// Devolve a lista de posts
module.exports.list = () => {
    return Schedule.find()
        .sort()
        .exec()
}