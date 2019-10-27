const users = require('../mocks/users')
    challenges = require('../mocks/challenges')
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
            let challenge = challenges.find(c => c.id == challengeId);
            challenge && user.challenges.push(challenge);
            return user;
        }
        return false;
    });
}

async function removeUsersChallenge(userId, challengeId) {
    return users.find((user) => {
        if (user.id == userId) {
            let challenge = user.challenges.find( ch => ch.id == challengeId)
                , index = user.challenges.indexOf(challenge.id.toString())
            ;
            user.challenges.splice(index, 1);
            return user;
        }
        return false;
    });
} 

async function getUsersChallenges(userId) {
    let user = users.find((user) => {
        if (user.id == userId) {
            return user;
        }
        return false;
    });
    return user.challenges;
}

async function hasUserChallenge(userId, challengeId) {
    let user = users.find((user) => {
        if (user.id == userId) {
            let challenge = user.challenges.find( ch => ch.id == challengeId);
            if (challenge) {
                return true;
            };
        }
        return false;
    });
    return !!user;
} 

module.exports = {
    findUser
    , saveUser
    , getAllUsers
    , addChallengeToUser
    , getUsersChallenges
    , hasUserChallenge
    , removeUsersChallenge
}
