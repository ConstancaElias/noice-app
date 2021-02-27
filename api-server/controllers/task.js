var Tasks = require('../models/task')

// return tasks
module.exports.list = () => {
    return Tasks.find()
        .sort()
        .exec()
}

// return tasks done
module.exports.listDone = () => {
    return Tasks.find({done: "true"})
        .sort()
        .exec()
}

