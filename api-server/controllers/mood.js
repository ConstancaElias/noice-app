var Mood = require('../models/mood')

// Devolve a lista de posts
module.exports.list = () => {
    return Mood.find()
        .sort()
        .exec()
}