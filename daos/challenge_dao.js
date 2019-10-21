const challenges = require('../mocks/challenges');

async function getAllChallenges() {
    return challenges;
}

module.exports = {
    getAllChallenges
}