var Motivational = require('../models/motivational')

// Devolve a lista de posts
module.exports.list = () => {
    return Motivational.find()
        .sort()
        .exec()
}