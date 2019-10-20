'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('UserPosts', {
          id: {
              allowNull: false,
              autoIncrement: true,
              primaryKey: true,
              type: Sequelize.INTEGER
          },
          postID: {
              type: Sequelize.INTEGER,
              references: {
                  model: 'posts',
                  key: 'id'
              }
          },
          userID: {
              type: Sequelize.INTEGER,
              references: {
                  model: 'users',
                  key: 'id'
              }
          },
          createdAt: {
              allowNull: false,
              type: Sequelize.DATE
          },
          updatedAt: {
              allowNull: false,
              type: Sequelize.DATE
          }
      });
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('UserPosts');
  }
};
