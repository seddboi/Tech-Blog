const {Model, Datatypes} = require('sequelize');
const sequelize = require('../config/connection');

class User extends Model {
    checkPass(pass) {
        return bcrypt.compareSync(pass, this.password);
    }
}

User.init(
    {
        id: {
            type: Datatypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: Datatypes.STRING,
            allowNull: false,
        },
        email: {
            type: Datatypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            }
        },
        password: {
            type: Datatypes.STRING,
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