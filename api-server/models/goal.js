var mongoose = require('mongoose')


const goal = mongoose.connection.useDb('Goal')



var goalSchema = new mongoose.Schema({
    id: String,
    title: String,
    motivational: String,
    mood: String
})


module.exports =  goal.model ('goal', goalSchema)