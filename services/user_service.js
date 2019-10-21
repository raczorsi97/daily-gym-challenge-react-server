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


async function login(data) {
    return await userDAO.findUser(data.username, data.password)
        .then((user) => {
            if (user == null) {
                throw new Error("No user found with given username and password");
            }
            return jwtService.generateUserToken(user);
        }).catch((error) => {
            throw new Error(error.message);
        });
}

async function register(data) {
    return await userDAO.getAllUsers()
        .then((users) => {
            users.find((user) => {
                if (user.username === data.username) {
                    let error = new Error('This username is already taken.');
                    error.field = 'username';
                    throw error;
                }
                if (user.email === data.email) {
                    let error = new Error('This email is already registered.');
                    error.field = 'email';
                    throw error;
                }
            });
        }).then(() => {
            return userDAO.saveUser(data).then((user) => {
                return jwtService.generateUserToken(user);
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

async function getAllUsersWithAllPosts() {
    return await userDAO.getAllUsersWithAllPosts().then((users) => {
        return users;
    }).catch((error) => {
        throw new Error(error.message);
    });
}

module.exports = {
    login,
    register,
    isValidLogin,
    isValidRegister,
    getAllUsers,
    getAllUsersWithAllPosts
}