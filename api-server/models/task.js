var mongoose = require('mongoose')


const task = mongoose.connection.useDb('Task')



var taskSchema = new mongoose.Schema({
    id: String,
    title: String,
    id: Number,     
    title: String,  
    description: String,
    done: Boolean,
    dueDate: String,
    done: Boolean,
    dueHour: String
})

module.exports =  task.model ('task', taskSchema)