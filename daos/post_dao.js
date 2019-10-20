const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const models = require('../models/index');

async function getAllPosts() {
    return models.Post.findAll();
}

async function create(data) {
    return models.Post.create({
        title: data.title,
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW'),
    });
}

async function edit(data) {
    return models.Post.update({
        title: data.title
    }, {
        where: {
            id: {
                [Op.eq]: data.id
            }
        }
    });
}

async function deletePost(data) {
    return models.Post.destroy({
        where: {
            id: {
                [Op.eq]: data.id
            }
        }
    });
}

module.exports = {
    getAllPosts,
    create,
    edit,
    deletePost
}