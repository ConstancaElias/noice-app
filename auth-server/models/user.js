var mongoose = require('mongoose')

var user = new mongoose.Schema({
    name: String,
    mail: String,
    password: String,
    level: String     // normal, admin
    //registerDate: Date,
    //lastAccessDate: Date
});

module.exports = mongoose.model('user', user)