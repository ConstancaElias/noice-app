var mongoose = require('mongoose')

const schedule = mongoose.connection.useDb('Schedule')

var scheduleSchema = new mongoose.Schema({
    id: Number,
    date: String,     
    title: String,  
    timeStarted: String,
    timeFinished: String,
    done: Boolean,
    notes: String,
    breakTime: Number,
    reward: String
})

module.exports =  schedule.model ('schedule', scheduleSchema)