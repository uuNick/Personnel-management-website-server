const { DataTypes } = require('sequelize');
const sequelize = require("../db");
const Employee = require("./Employee");
const User = require("./User");


const DataChange = sequelize.define('DataChange', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    employee_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Employee,
            key: 'id'
        }
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    date_of_change: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    type_of_change: {
        type: DataTypes.STRING(255),
        allowNull: false,
    }
}, {
    timestamps: false,
});


module.exports = DataChange;