var Goal = require('../models/goal')


// Returns list goal
module.exports.list = ()=> {
    return Goal
        .find()
        .exec()
}

//insert new goal
module.exports.insert = (newGoal)=> {
    var g = new Goal(newGoal)
    return g.save();
}

// apaga um recurso dado o seu ID
module.exports.delete = id => {
    return Goal.deleteOne({_id: id });
};


