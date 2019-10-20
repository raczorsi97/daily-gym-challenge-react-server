'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Users', [{
            username: 'johndoe',
            firstName: 'John',
            lastName: 'Doe',
            email: 'demo@demo.com',
            createdAt: Sequelize.fn('NOW'),
            updatedAt: Sequelize.fn('NOW'),
            password: 'internet'
        }], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Users', null, {});
    }
};
