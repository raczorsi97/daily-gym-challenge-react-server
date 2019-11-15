var mongoose = require('mongoose')
    , Schema = mongoose.Schema
;

var Users = new Schema({
    name: { type : String , required : true }
    , username: { type : String , unique : true, required : true }
    , password: { type : String , unique : true, required : true }
    , email: { type : String , unique : true, required : true }
    , image: String
    , challenges: Array
    , completed_challenges: Array
    , abandoned_challenges: Array
});

module.exports = mongoose.model('UserModel', Users, 'Users');