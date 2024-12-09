const { DataTypes } = require('sequelize');
const sequelize = require("../db");
const Employee = require("./Employee");

const DayOff = sequelize.define('DayOff', {
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
            key: "id",
        }
    },
    start_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    end_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    reason: {
        type: DataTypes.TEXT,
        allowNull: true
    }
});


module.exports = DayOff;