var mongoose = require('mongoose')
    , Schema = mongoose.Schema
;

var Users = new Schema({
    name: String,
    username: String,
    password: String,
    email: String,
    image: String,
    challenges: Array,
    completed_challenges: Array,
    abandoned_challenges: Array
});

module.exports = mongoose.model('UserModel', Users, 'Users');