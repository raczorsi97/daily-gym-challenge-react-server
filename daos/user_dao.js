const users = require('../mocks/users');

async function findUser(username, password) {
    return users.find((user) => {
        return (user.username === username && user.password === password);
    })
}

async function saveUser(user) {
    let id = users[users.length - 1].id + 1;
    user.id = id;
    return users.push(user);
}

async function getAllUsers() {
    return users;
}

module.exports = {
    findUser,
    saveUser,
    getAllUsers,
}
