'use strict';
module.exports = (sequelize, DataTypes) => {
    var User = sequelize.define('User', {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: DataTypes.STRING,
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        email: DataTypes.STRING
    }, {
        timestamps: true,
        indexes: [
            {
                unique: true,
                fields: ['username']
            }
        ]
    });

    User.associate = function (models) {
        User.belongsToMany(models.Post, { through: models.UserPost });
    };

    return User;
};