var mongoose = require('mongoose')


const goal = mongoose.connection.useDb('Goals')



var goalSchema = new mongoose.Schema({
    id: Number,
    title: String,
    done: String
})

module.exports =  goal.model ('goal', goalSchema)