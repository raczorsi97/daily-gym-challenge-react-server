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
            let emailFormat = new RegExp('^\w+@\w+\..{2,3}(.{2,3})?$');
            console.log('Huh.... :', data.email);
            if (!emailFormat.test(data.email)) {
                console.log('Invalid format...');
                // throw createError('email', 'Please provide a valid email.');
            } else {
                console.log('Matchy matchy');
            }
            users.find((user) => {
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