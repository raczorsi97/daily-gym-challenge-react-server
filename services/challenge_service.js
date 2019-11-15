// const challengeDAO = require('../daos/challenge_dao');

const ChallengeModel = require('../schemas/challengeSchema');

getAllChallenges = function(req, res) {
    ChallengeModel.find({}, function(err, challenges) {
        if (err) {
            return res.status(500).send(err.errmsg);
        }
        return res.json(challenges);
    });
}

async function getChallengeById(id) {
    return await challengeDAO.getChallengeById(id)
        .then((challenge) => {
            return challenge;
        }).catch((error) => {
            throw new Error(error.message);
        });
}

async function getChallengePercentage(id) {
    return await challengeDAO.getChallengePercentage(id)
        .then((percentage) => {
            return percentage;
        }).catch((error) => {
            throw new Error(error.message);
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