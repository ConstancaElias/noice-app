var mongoose = require('mongoose')


const task = mongoose.connection.useDb('Task')



var taskSchema = new mongoose.Schema({
    id: String,
    title: String,
    description: String,
    dueDate: String,
    done: Boolean
})


module.exports =  task.model ('task', taskSchema)