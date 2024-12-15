const { DataTypes } = require('sequelize');
const sequelize = require("../db");
const Employee = require("./Employee");
const Document = require("./Document");

const Vacation = sequelize.define('Vacation', {
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
    document_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Document,
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
    type: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
}, {
    timestamps: false,
});


module.exports = Vacation;