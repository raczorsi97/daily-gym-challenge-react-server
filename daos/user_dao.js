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
    user.abandoned_challenges = [];
    user.completed_challenges = [];
    users.push(user)
    return user;
}

async function getAllUsers() {
    return users;
}

async function getUser(userId) {
    return users.find((user) => { return user.id == userId });
}

async function addChallengeToUser(userId, challengeId) {
    return users.find((user) => {
        if (user.id == userId) {
            let ch = user.challenges.find(c => c.id == challengeId);
            if (ch) {
                throw new Error('The user already has this challenge!');
            };
            
            let challenge = challenges.find(c => c.id == challengeId);
            challenge.status = 'in_progress';
            challenge.users.push(userId);

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
            user.challenges[index].status = 'abandoned';
            user.abandoned_challenges.push(user.challenges[index]);
            return user;
        }
        return false;
    });
}

async function completeUsersChallenge(userId, challengeId) {
    return users.find((user) => {
        if (user.id == userId) {
            let index = user.challenges.findIndex(ch => ch.id == challengeId);
            if ( index < 0 ) {
                throw new Error('Something went wrong...');
            }
            user.challenges[index].status = 'completed';
            user.completed_challenges.push(user.challenges[index]);
            return user;
        }
        return false;
    });
}

async function resetUsersChallenge(userId, challengeId) {
    return users.find((user) => {
        if (user.id == userId) {
            let index = user.challenges.findIndex(ch => ch.id == challengeId);
            if ( index < 0 ) {
                throw new Error('Something went wrong...');
            }
            user.challenges.splice(index, 1);

            index = user.abandoned_challenges.findIndex(ch => ch.id == challengeId);
            user.abandoned_challenges.splice(index, 1);
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
    return {
        challenges: user.challenges
        , completed_challenges: user.completed_challenges
        , abandoned_challenges: user.abandoned_challenges
    };
}

async function getUsersCompletedChallenges(userId) {
    let user = users.find((user) => {
        if (user.id == userId) {
            return user;
        }
        return false;
    });
    return user.completed_challenges;
}

async function getUsersInProgressChallenges(userId) {
    let challenges = [];
    users.find((user) => {
        if (user.id == userId) {
            user.challenges.forEach( challenge => {
                if (challenge.status === 'in_progress') {
                    challenges.push(challenge);
                }
            })
            return user;
        }
        return false;
    });
    return challenges;
}

async function getUsersAbandonedChallenges(userId) {
    let user = users.find((user) => {
        if (user.id == userId) {
            return user;
        }
        return false;
    });
    return user.abandoned_challenges;
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
        return ( index < 0);
    });
    return unassignedChallenges;
}

async function hasUserChallenge(userId, challengeId) {
    let challengeToFind = false;
    users.forEach((user) => {
        if (user.id == userId) {
            let challenge = user.challenges.find((ch) => ch.id == challengeId);
            if (challenge) {
                challengeToFind = challenge;
            };
        }
    });
    return challengeToFind;
} 
 
module.exports = {
    getUser
    , findUser
    , saveUser
    , getAllUsers
    , addChallengeToUser
    , getUsersChallenges
    , hasUserChallenge
    , removeUsersChallenge
    , completeUsersChallenge
    , getUnassignedChallengesToUser
    , getUsersCompletedChallenges
    , getUsersInProgressChallenges
    , getUsersAbandonedChallenges
    , resetUsersChallenge
}
