'use strict';
module.exports = (sequelize, DataTypes) => {
    var Post = sequelize.define('Post', {
        title: DataTypes.STRING
    }, {
        timestamps: true
    });

    Post.associate = function (models) {
        Post.belongsToMany(models.User, { through: models.UserPost });
    };

    return Post;
};