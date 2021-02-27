var mongoose = require('mongoose')


const goal = mongoose.connection.useDb('Goal')



var goalSchema = new mongoose.Schema({
    id: String,
    id: Number,
    title: String,
    motivational: String,
    mood: String
    done: String
})

module.exports =  goal.model ('goal', goalSchema)