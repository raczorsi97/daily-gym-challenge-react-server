const users = require('../mocks/users');

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

module.exports = {
    findUser,
    saveUser,
    getAllUsers,
}
