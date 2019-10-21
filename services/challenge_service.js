const challengeDAO = require('../daos/challenge_dao');

async function getAllChallenges() {
    return await challengeDAO.getAllChallenges()
        .then((challenges) => {
            return challenges;
        }).catch((error) => {
            throw new Error(error.message);
        });
}

module.exports = {
    getAllChallenges
}