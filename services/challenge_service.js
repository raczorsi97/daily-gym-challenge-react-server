const challengeDAO = require('../daos/challenge_dao');

async function getAllChallenges() {
    return await challengeDAO.getAllChallenges()
        .then((challenges) => {
            if (!challenges.length) {
                throw new Error('There are no challenges :(');
            }
            return challenges;
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