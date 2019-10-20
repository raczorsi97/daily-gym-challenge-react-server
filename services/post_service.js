const lodash = require('lodash');
const postDAO = require('../daos/post_dao');

function isValid(data) {
    return isDataExists(data.title);
}

function isDataExists(field) {
    return (!lodash.isUndefined(field) && !lodash.isEmpty(field.trim()));
}

async function getAllPosts() {
    return await postDAO.getAllPosts().then((posts) => {
        return posts;
    }).catch((error) => {
        throw new Error(error.message);
    });
}

async function create(data) {
    return await postDAO.create(data).then((post) => {
        return post;
    }).catch((error) => {
        throw new Error(error.message);
    });
}

async function edit(data) {
    return await postDAO.edit(data).then((post) => {
        return post;
    }).catch((error) => {
        throw new Error(error.message);
    });
}

async function deletePost(data) {
    return await postDAO.deletePost(data).then((post) => {
        return post;
    }).catch((error) => {
        throw new Error(error.message);
    });
}

module.exports = {
    isValid,
    getAllPosts,
    create,
    edit,
    deletePost
}