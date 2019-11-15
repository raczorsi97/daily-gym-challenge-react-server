const lodash = require('lodash');
const jwtService = require('../services/jwt_service');
const userDAO = require('../daos/user_dao');

const UserModel = require('../schemas/userSchema')
    , ChallenngeModel = require('../schemas/challengeSchema');

function isValidLogin(data) {
    return (isDataExists(data.username) && isDataExists(data.password));
}

function isValidRegister(data) {
    return (
        isDataExists(data.username) && 
            isDataExists(data.password) &&
                isDataExists(data.name) &&
                    isDataExists(data.email)
    );
}

function isDataExists(field) {
    return (!lodash.isUndefined(field) && !lodash.isEmpty(field.trim()));
}


login = function(req, res) {
    let data = req.body;
    UserModel.findOne({ username: data.username, password: data.password } , function (err, user) {
        if (err) {
            return res.status(500).send(err.errmsg);
        }
        if (!user) {
            return res.status(500).send('User not found');
        }
        let token = jwtService.generateUserToken(user);
        return res.json({ token, user });
    });
}

register = function(req, res) {
    let data = req.body;
    if (isValidRegister(data)) {
        UserModel.create(data, function (err, user) {
            if (err) {
                return res.status(500).send(err.errmsg);
            }
            let token = jwtService.generateUserToken(user);
            return res.json({ token, user });
        });
    } else {
        return res.status(500).send({ error: 'missing fields' });
    }
}

getAllUsers = function(req, res) {
    UserModel.find({} , function (err, allusers) {
        if (err) {
           return res.status(500).send(err);
        }
        return res.json(allusers);
    });
}

getAllUsersModified = function(req, res) {
    UserModel.find({ _id: { $ne: req.params.userId } } , function (err, allusers) {
        if (err) {
           return res.status(500).send(err);
        }
        return res.json(allusers);
    });
}

getUser = function(req, res) { 
    UserModel.findOne({ _id: req.params.userId } , function (err, user) {
        if (err) {
            return res.status(500).send(err);
        }
        return res.json(user);
    });
}

getTopList = function(req, res) {
    let mappedUsers = []
        , sortedUsers = []
    ;
    UserModel.find({}, function(err, users) {
        if (err) {
            return res.status(500).send(err);
        }
        mappedUsers = users.map( u => { 
            return { user: u, count: u.completed_challenges.length };
        });
        sortedUsers = mappedUsers.sort((a, b) => {
            return b.count - a.count;
        });
        res.json(sortedUsers);
    });
}

updateUser = function(req, res) {
    let userId = req.params.userId
        , data = req.body.data
    ;
    UserModel.updateOne({ _id: userId}, { $set: data }, function(err, user) {
        if (err) {
            return res.status(500).send(err);
        }
        UserModel.findOne({ _id: userId}, function(err, user) {
            if (err) {
                return res.status(500).send(err);
            }
            return res.json(user);
        });
    });
}

addChallengeToUser = function(req, res) {
    let userId = req.params.userId
        , challengeId = req.params.challengeId
    ;
    UserModel.findOneAndUpdate({ _id: userId}, { $push: { challenges: challengeId }}, function(err, resp) {
        if (err) {
            return res.status(500).send(err);
        }
        UserModel.findOne({ _id: userId}, function(err, user) {
            if (err) {
                return res.status(500).send(err);
            }
            console.log('Challenge added :', user);
            return res.json(user);
        });
    });
}

async function addChallengeToUser(userId, challengeId) {
    return await userDAO.addChallengeToUser(userId, challengeId)
        .then((user) => {
            return user;
        }).catch((error) => {
            throw error.message;
        });
}

async function removeUsersChallenge(userId, challengeId) {
    return await userDAO.removeUsersChallenge(userId, challengeId)
        .then((user) => {
            return user;
        }).catch((error) => {
            throw error.message;
        });
}

async function completeUsersChallenge(userId, challengeId) {
    return await userDAO.completeUsersChallenge(userId, challengeId)
        .then((user) => {
            return user;
        }).catch((error) => {
            throw error.message;
        });
}

async function resetUsersChallenge(userId, challengeId) {
    return await userDAO.resetUsersChallenge(userId, challengeId)
        .then((user) => {
            return user;
        }).catch((error) => {
            throw error.message;
        });
}

async function getUsersChallenges(userId) {
    return await userDAO.getUsersChallenges(userId)
        .then((challenges) => {
            return challenges;
        }).catch((error) => {
            throw error.message;
        }
    );
}

async function getUnassignedChallengesToUser(userId) {
    return await userDAO.getUnassignedChallengesToUser(userId)
        .then((unassignedChallenges) => {
            return unassignedChallenges;
        }).catch((error) => {
            throw error.message;
        }
    );
}

hasUserChallenge = function(req, res) {
    let userId = req.params.userId
        , challengeId = req.params.challengeId
    ;
    UserModel.find({ _id: userId, challenges: { $in: challengeId }}, function(err, user) {
        if (err) {
            return res.status(500).send(err);
        }
        if (!user) {
            return res.json(false);
        } else {
            return res.json(user);
        }
    })
    // return await userDAO.hasUserChallenge(userId, challengeId)
    //     .then((resp) => {
    //         return resp;
    //     }).catch((error) => {
    //         throw error.message;
    //     }
    // );
}

async function getAllChallengesWithStatus(userId) {
    return await userDAO.getAllChallengesWithStatus(userId)
        .then((resp) => {
            return resp;
        }).catch((error) => {
            throw error.message;
        });
}

async function getUsersChallengeCounts(userId) {
    return await userDAO.getUsersChallengeCounts(userId)
        .then((resp) => {
            return resp;
        }).catch((error) => {
            throw error.message;
        });
}

module.exports = {
    login
    , register
    , getUser
    , updateUser
    , isValidLogin
    , isValidRegister
    , getAllUsers
    , addChallengeToUser
    , getUsersChallenges
    , hasUserChallenge
    , removeUsersChallenge
    , completeUsersChallenge
    , resetUsersChallenge
    , getUnassignedChallengesToUser
    , getAllChallengesWithStatus
    , getAllUsersModified
    , getUsersChallengeCounts
    , getTopList
}