const {Model, Datatypes} = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {

};

Post.init(
    {
        id: {
            type: Datatypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: Datatypes.STRING,
            allowNull: false,
        },
        content: {
            type: Datatypes.TEXT,
            allowNull: false,
        },
        user_id: {
            type: Datatypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        },
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'post'
    } 
);

module.exports = Post;