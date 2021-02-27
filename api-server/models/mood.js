var mongoose = require('mongoose')

const mood = mongoose.connection.useDb('Mood')

var moodSchema = new mongoose.Schema({
    id: Number,
    option: String
})

module.exports =  mood.model ('mood', moodSchema) 