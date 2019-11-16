var mongoose = require('mongoose')
    , Schema = mongoose.Schema
;

var Challenge = new Schema({
    title: { type : String , required : true }
    , short_description: { type : String, required : true }
    , long_description: { type : String, required : true }
    , category: { type : String, required : true }
    , creation_date: Date
    , image: String
    , in_progress: Array
    , completed: Array
    , abandoned: Array
    , ratings: Array
    , rating: Number
    , status: String
});

module.exports = mongoose.model('ChallengeModel', Challenge, 'Challenges');