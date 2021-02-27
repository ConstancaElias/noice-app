var Tasks = require('../models/task')

// Devolve a lista de posts
module.exports.list = () => {
    return Tasks.find()
        .sort()
        .exec()
}

