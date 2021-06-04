const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class User extends Model {
    checkPass(pass) {
        return bcrypt.compareSync(pass, this.password);
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [10]
            }
        },
    },
    {
        hooks: {
            async beforeCreate(data) {
                data.password = await bcrypt.hash(data.password, 10);
                return data;
            },
            // async beforeUpdate(data) {
            //     data.password = await bcrypt.hash(data.password, 10);
            //     return data;
            // }
        },
        sequelize,
        timestamps: false,
        freezTableName: true,
        underscored: true,
        modelName: 'user',
    }
);

module.exports = User;