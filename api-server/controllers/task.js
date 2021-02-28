var Tasks = require('../models/task')

// return tasks
module.exports.list = () => {
    return Tasks.find()
        .sort()
        .exec()
}

// return list of tasks done
module.exports.listDone = () => {
    return Tasks.find({done: "True"})
        .sort()
        .exec()
}

//delete a task
module.exports.delete = (id) => {
    return Tasks.deleteOne({_id: id})
}

//insert new goal
module.exports.insert = (newTask)=> {
    var t = new Tasks(newTask)
    return t.save();
}

module.exports.update = task => {
    return Tasks.updateOne({_id: task.id },{$set: {title: task.title, description: task.description, dueDate: task.dueDate}});
};

module.exports.updateDone = id => {
    return Tasks.updateOne({_id: id },{$set: {done: "True"}});
};