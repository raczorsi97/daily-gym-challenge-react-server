const lodash = require('lodash');
const jwtService = require('../services/jwt_service');
const userDAO = require('../daos/user_dao');

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

function createError(field, message) {
    let error = new Error(message);
    error.field = field;
    return error;
}


async function login(data) {
    return await userDAO.findUser(data.username)
        .then((user) => {
            if (user == null) {
                throw createError('username', 'Invalid username');
            }
            if (user.password !== data.password) {
                throw createError('password', 'Invalid credentials');
            }
            let token = jwtService.generateUserToken(user);
            return { user, token };
        })
        .catch((error) => {
            throw error;
        });
}

async function register(data) {
    return await userDAO.getAllUsers()
        .then((users) => {
            let emailFormat = new RegExp('^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$');
            users.find((user) => {
                if (!emailFormat.test(data.email)) {
    
                    throw createError('email', 'Please provide a valid email.');
                }
                if (user.username === data.username) {
                    throw createError('username', 'This username is already taken.');
                }
                if (user.email === data.email) {
                    throw createError('email', 'This email is already registered.');
                }
            });
        })
        .then(() => {
            return userDAO.saveUser(data).then((user) => {
                let token = jwtService.generateUserToken(user);
                return { token, user };
            }).catch((error) => {
                throw new Error(error.message);
            });
        });
}

async function getAllUsers() {
    return await userDAO.getAllUsers().then((users) => {
        return users;
    }).catch((error) => {
        throw new Error(error.message);
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
            console.log('Za error :', error.message);
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

async function hasUserChallenge(userId, challengeId) {
    return await userDAO.hasUserChallenge(userId, challengeId)
        .then((resp) => {
            return resp;
        }).catch((error) => {
            throw error.message;
        }
    );
}

module.exports = {
    login
    , register
    , isValidLogin
    , isValidRegister
    , getAllUsers
    , addChallengeToUser
    , getUsersChallenges
    , hasUserChallenge
    , removeUsersChallenge
    , getUnassignedChallengesToUser
}