const challenges = require('../mocks/challenges');

async function getAllChallenges() {
    return challenges;
}

async function getChallengeById(id) {
    return challenges.find((challenge) => {
        return challenge.id == id;
    });
}

module.exports = {
    getAllChallenges
    , getChallengeById
}