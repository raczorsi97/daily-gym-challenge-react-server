const users = require('../mocks/users')
    challenges = require('../mocks/challenges')
;

const UserModel = require('../schemas/userSchema');

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
    // return users.filter(u => u.id != userId);
    console.log(UserModel);
    UserModel.find()
        .exec((err, users) => {
            if (err) {
                console.log('Whoops error :', err);
            }
            console.log(users);
            return users;
        });
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
            let ch = user.challenges.find(c => {
                return c == challengeId });
            if (ch) {
                throw new Error('The user already has this challenge!');
            };
            
            let challenge = challenges.find(c => c.id == challengeId);
            challenge.in_progress.push(userId);

            user.challenges.push(challengeId);
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
    
            let index = user.challenges.findIndex(ch => ch == challengeId);
            if ( index < 0 ) {
                throw new Error('Something went wrong...');
            }
            user.challenges.splice(index, 1);
    
            index = user.abandoned_challenges.findIndex(ch => ch == challengeId);
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

function getUsersChallengesSync(userId) {
    let user
        , allChallenges = []
        , completedChallenges = []
        , abandonedChallenges = []
        , inProgressChallenges = []
    ;
    user = users.find((user) => {
        if (user.id == userId) {
            return user;
        }
        return false;
    });
    challenges.forEach( ch => {
        user.completed_challenges.forEach( uCh => {
            if (ch.id == uCh) {
                ch.status = 'completed';
                completedChallenges.push(ch);
            }
        });
    });
    challenges.forEach( ch => {
        user.abandoned_challenges.forEach( uCh => {
            if (ch.id == uCh) {
                ch.status = 'abandoned';
                abandonedChallenges.push(ch);
            }
        });
    });
    challenges.forEach( ch => {
        user.challenges.forEach( uCh => {
            if (ch.id == uCh) {
                if (!ch.status || ch.status == 'in_progress') {
                    ch.status = 'in_progress';
                    inProgressChallenges.push(ch);
                }
                allChallenges.push(ch);
            }
        });
    });

    return {
        challenges: allChallenges
        , completedChallenges: completedChallenges
        , abandonedChallenges: abandonedChallenges
        , inProgressChallenges: inProgressChallenges
    };
}

async function getUsersChallenges(userId) {
    return getUsersChallengesSync(userId);
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
        let index = userChallenges.findIndex( uCh => uCh == challenge.id);
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
                } else if ( user.abandoned_challenges.includes(challengeId)) {
                    challengeToFind.status = 'abandoned';
                } else {
                    challengeToFind.status = 'in_progress';
                }
            }
        }
    });
    return challengeToFind;
}

async function getAllChallengesWithStatus(userId) {
    let allChallenges = [];
    challenges.forEach((challenge) => {
        let index = challenge.completed.findIndex(uId => uId == userId);
        if ( index > -1 ) {
            allChallenges.push({ name: challenge.title, status: 'completed' });
        } else {
            index = challenge.abandoned.findIndex(uId => uId == userId);
            if ( index > -1 ) {
                allChallenges.push({ name: challenge.title, status: 'abandoned' });
            } else {
                index = challenge.in_progress.findIndex( uId => uId == userId);
                if ( index > -1 ) {
                    allChallenges.push({ name: challenge.title, status: 'in_progress' });
                } else {
                    allChallenges.push({ name: challenge.title, status: 'ready_to_start' });
                }
            }
        }
    });
    return allChallenges; 
}

async function getUsersChallengeCounts(userId) {
    let allChallenges = getUsersChallengesSync(userId);
    return {
        completed: allChallenges.completedChallenges.length
        , abandoned: allChallenges.abandonedChallenges.length
        , inProgress: allChallenges.inProgressChallenges.length
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
    , resetUsersChallenge
    , getAllChallengesWithStatus
    , getAllUsersModified
    , getUsersChallengeCounts
    , getTopList
}
