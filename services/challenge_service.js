// const challengeDAO = require('../daos/challenge_dao');

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

async function getChallengeRating(id) {
    return await challengeDAO.getChallengeRating(id)
        .then((percentage) => {
            return percentage;
        }).catch((error) => {
            throw new Error(error.message);
        });
}

async function rateChallenge(challengeId, rating) {
    return await challengeDAO.rateChallenge(challengeId, rating)
        .then((challenge) => {
            return challenge;
        }).catch((error) => {
            throw new Error(error.message);
        });
}

module.exports = {
    getAllChallenges
    , getChallengeById
    , getChallengePercentage
    , getChallengeRating
    , rateChallenge
}