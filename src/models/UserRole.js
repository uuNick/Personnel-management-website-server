const { DataTypes } = require('sequelize');
const sequelize = require("../db");
const User = require("./User");
const Role = require("./Role");


const UserRole = sequelize.define('UserRole', {
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id',
        },
    },
    roleId: {
        type: DataTypes.INTEGER,
        references: {
            model: Role,
            key: 'id',
        },
    },
}, {
    timestamps: false,
    primaryKey: false,
    freezeTableName: true,
});

module.exports = UserRole;