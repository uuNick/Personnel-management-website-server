const { DataTypes } = require('sequelize');
const sequelize = require("../db");

const Employee = sequelize.define('Employee', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    fullname: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    birth_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    position: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    start_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    phone_number: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    address: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    image_name: {
        type: DataTypes.STRING(50),
        allowNull: true,
    }
});


module.exports = Employee;