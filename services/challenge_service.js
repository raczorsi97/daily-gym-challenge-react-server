const UserModel = require('../schemas/userSchema')
    , ChallengeModel = require('../schemas/challengeSchema');

getAllChallenges = function(req, res) {
    ChallengeModel.find({}, function(err, challenges) {
        if (err) {
            return res.status(500).send(err.errmsg);
        }
        return res.json(challenges);
    });
}

getChallengeById = function(req, res) {
    ChallengeModel.findOne({ _id: req.params.id }, (err, challenge) => {
        if (err) {
            return res.status(500).send(err.errmsg);
        }
        return res.json(challenge);
    });
}

getChallengePercentage = function(req, res) {
    ChallengeModel.findOne({ _id: req.params.id}, (err, challenge) => {
        if (err) {
            return res.status(500).send(err.errmsg);
        }
        UserModel.find({}, (err, users) => {
            if (err) {
                return res.status(500).send(err.errmsg);
            }
            let  allUsers = users.length
                , inProgressCount = challenge.in_progress.length
                , completedCount = challenge.completed.length
                , abandonedCount = challenge.abandoned.length
                , inProgressPercentage = (inProgressCount * 100) / allUsers
                , completedPercentage = (completedCount * 100) / allUsers
                , abandonedPercentage = (abandonedCount * 100) / allUsers
                , notAssignedPercentage = 100 - (inProgressPercentage + completedPercentage + abandonedPercentage)
            ;
            return res.json({
                rating: challenge.rating
                , inProgressPercentage
                , completedPercentage
                , abandonedPercentage
                , notAssignedPercentage
            });
        }); 
    });
}

getChallengeRating = function(req, res) {
   ChallengeModel.find({ _id: req.params.id}, (err, challenge) => {
        if (err) {
            return res.status(500).send(err.errmsg);
        }
        return res.json(challenge.rating);
   });
}

rateChallenge = function(req, res) {
    let challengeId = req.params.id
        , rating = req.params.rating
    ;
    ChallengeModel.findOneAndUpdate({ _id: challengeId }, {$push: {ratings: rating}}, (err, challenge) => {
        if (err) {
            return res.status(500).send(err.errmsg);
        }
        let sum  = challenge.ratings.reduce((a, b) => a + b, 0)
            , rating = (sum/challenge.ratings.length).toFixed(2)
        ;
        ChallengeModel.findOneAndUpdate({ _id: challengeId }, { rating }, (err, challenge) => {
            if (err) {
                return res.status(500).send(err.errmsg);
            }
            return res.json(challenge);
        });
    });
}

module.exports = {
    getAllChallenges
    , getChallengeById
    , getChallengePercentage
    , getChallengeRating
    , rateChallenge
}