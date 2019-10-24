const users = require('../mocks/users')
    challenges = require('../mocks/users')
;

async function findUser(username, password) {
    return users.find((user) => {
        return (user.username === username);
    })
}

async function saveUser(user) {
    user.id =  users[users.length - 1].id + 1;
    users.push(user)
    return user;
}

async function getAllUsers() {
    return users;
}

async function addChallengeToUser(userId, challengeId) {
    return users.find((user) => {
        if (user.id == userId) {
            if (user.challenges.includes(challengeId)) {
                throw new Error('The user already has this challenge!');
            };
            user.challenges.push(challengeId);
            return user;
        }
        return false;
    });
} 

async function getUsersChallenges(userId) {
    return users.find((user) => {
        if (user.id === userId) {
            return user.challenges;
        }
        return {};
    });
}

module.exports = {
    findUser,
    saveUser,
    getAllUsers,
    addChallengeToUser,
    getUsersChallenges
}
