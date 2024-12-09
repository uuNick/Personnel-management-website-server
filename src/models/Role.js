const { DataTypes } = require('sequelize');
const sequelize = require("../db");

const Role = sequelize.define('Role', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    roleName: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
    },
}, {
    timestamps: true,
    freezeTableName: true,
});

module.exports = Role;