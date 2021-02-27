var mongoose = require('mongoose')

const motivational = mongoose.connection.useDb('Motivational')

var motivationalSchema = new mongoose.Schema({
    id: Number,     
    phrase: String
})

module.exports =  motivational.model ('motivational', motivationalSchema)