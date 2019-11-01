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
    user.challenges = [];
    users.push(user)
    return user;
}

async function getAllUsers() {
    return users;
}

async function addChallengeToUser(userId, challengeId) {
    return users.find((user) => {
        if (user.id == userId) {
            let ch = user.challenges.find(c => c.id == challengeId);
            if (ch) {
                throw new Error('The user already has this challenge!');
            };
            let challenge = challenges.find(c => c.id == challengeId);
            user.challenges.push(challenge);
    
            return user;
        }
        return false;
    });
}

async function removeUsersChallenge(userId, challengeId) {
    return users.find((user) => {
        if (user.id == userId) {
            let index = user.challenges.findIndex(ch => ch.id == challengeId);
            if ( index < 0 ) {
                throw new Error('Something went wrong...');
            }
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

async function getUnassignedChallengesToUser(userId) {
    let user =  users.find((user) => {
        if (user.id == userId) {
            return user;
        }
        return false;
    })
    , userChallenges = user && user.challenges
    , unassignedChallenges = challenges.filter((challenge) => {
        let index = userChallenges.findIndex( uCh => uCh.id == challenge.id);
        console.log('Das index :', index);
        return ( index < 0);
    });

    console.log('Unassigned challenges :', unassignedChallenges);
    return unassignedChallenges;
}

async function hasUserChallenge(userId, challengeId) {
    let user = users.find((user) => {
        if (user.id == userId) {
            let challenge = user.challenges.find((ch) => ch.id == challengeId); 
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
    , getUnassignedChallengesToUser
}
