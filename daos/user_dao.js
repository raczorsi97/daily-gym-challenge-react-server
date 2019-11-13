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

async function getAllUsersModified(userId) {
    return users.filter(u => u.id != userId);
}

async function getUser(userId) {
    return users.find((user) => { return user.id == userId });
}

async function updateUser(userId, data) {
    return users.find((user) => {
        if (user.id == userId) {
            data.name && (user.name = data.name);
            data.username && (user.username = data.username);
            data.image && (user.image = data.image);
            data.email && (user.email = data.email);
            data.description && (user.description = data.description);
            return user;
        }
        return false;
    });
}

async function addChallengeToUser(userId, challengeId) {
    return users.find((user) => {
        if (user.id == userId) {
            console.log('Prev challenges :', user.challenges);
            let ch = user.challenges.find(c => {
                return c == challengeId });
            if (ch) {
                throw new Error('The user already has this challenge!');
            };
            
            let challenge = challenges.find(c => c.id == challengeId);
            challenge.in_progress.push(userId);

            user.challenges.push(challengeId);
            console.log('New challenges :', user.challenges);
            return user;
        }
        return false;
    });
}

async function removeUsersChallenge(userId, challengeId) {
    return users.find((user) => {
        if (user.id == userId) {
            let index = user.challenges.findIndex(ch => ch == challengeId);

            if ( index < 0 ) {
                throw new Error('Something went wrong...');
            }
            user.abandoned_challenges.push(challengeId);

            let challenge = challenges.find(ch => ch.id == challengeId)
                , userIndex = challenge.in_progress.findIndex( id => id == userId );

            if ( userIndex < 0 ) {
                throw new Error('Something went wrong...');
            }

            challenge.abandoned.push(userId);
            challenge.in_progress.splice(userIndex, 1);
            return user;
        }
        return false;
    });
}

async function completeUsersChallenge(userId, challengeId) {
    return users.find((user) => {
        if (user.id == userId) {
            let index = user.challenges.findIndex(ch => ch == challengeId);
            if ( index < 0 ) {
                throw new Error('Something went wrong...');
            }
            user.completed_challenges.push(challengeId);

            let challenge = challenges.find(ch => ch.id == challengeId)
                , userIndex = challenge.in_progress.findIndex( id => id == userId );

            if ( userIndex < 0 ) {
                throw new Error('Something went wrong...');
            }

            challenge.completed.push(userId);
            challenge.in_progress.splice(userIndex, 1);

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

            let challenge = challenges.find(ch => ch.id == challengeId)
                , userIndex = challenge.abandoned.findIndex( id => id == userId );

            if ( userIndex < 0 ) {
                throw new Error('Something went wrong...');
            }
            challenge.abandoned.splice(userIndex, 1);

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
        , completed_challenges: user.completed_challenges //TODO!
        , abandoned_challenges: user.abandoned_challenges //TODO!
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
    let inProgressChallenges = [];
    users.find((user) => {
        if (user.id == userId) {
            user.challenges.forEach( cId => {
                users.abandoned_challenges.forEach( aId => {
                    if ( aId == cId ) {
                        //this challenge is abandoned
                    } else {
                        inProgressChallenges.push(cId);
                    }
                })
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
        return (index < 0);
    });
    return unassignedChallenges;
}

async function hasUserChallenge(userId, challengeId) {
    let challengeToFind = false;
    users.forEach((user) => {
        if (user.id == userId) {
            if (user.challenges.includes(challengeId)) {
                challengeToFind = challenges.find(ch => ch.id == challengeId);

                if ( user.completed_challenges.includes(challengeId)) {
                    challengeToFind.status = 'completed';
                }

                if ( user.abandoned_challenges.includes(challengeId)) {
                    challengeToFind.status = 'abandoned';
                }
            }
        }
    });
    return challengeToFind;
}

async function getAllChallengesWithStatus(userId) {
    let allChallenges = []
        , user = users.find(u => u.id == userId)
    ;
    challenges.forEach((challenge) => {
        var usersChallenge = user.challenges.find( c => c.id == challenge.id);
        if ( usersChallenge ) {
            allChallenges.push({ name: usersChallenge.title, status: usersChallenge.status });
        } else {
            allChallenges.push({ name: challenge.title, status: 'ready_to_start' });
        }

    });
    return allChallenges; 
}

async function getUsersChallengeCounts(userId) {
    let user = users.find(u => u.id == userId);
    return {
        completed: user.completed_challenges.length
        , abandoned: user.abandoned_challenges.length
        , inProgress: user.challenges.filter( c => c.status === 'in_progress').length
    };
}

async function getTopList() {
    var usersAndCompletedChallenges = users.map( user => {
        return { user, count: user.completed_challenges.length }
    });
    return usersAndCompletedChallenges.sort((a, b) => {
        return b.count - a.count;
    });
}
 
module.exports = {
    getUser
    , findUser
    , saveUser
    , updateUser
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
    , getAllChallengesWithStatus
    , getAllUsersModified
    , getUsersChallengeCounts
    , getTopList
}
