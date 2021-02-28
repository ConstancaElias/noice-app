var Mood = require('../models/mood')

// Devolve a lista de posts
module.exports.list = () => {
    return Mood.find()
        .sort()
        .exec()
}

//insert new goal
module.exports.insert = (newMood)=> {
    var m = new Mood(newMood)
    return m.save();
}