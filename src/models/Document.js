const { DataTypes } = require('sequelize');
const sequelize = require("../db");
const Employee = require("./Employee");

const Document = sequelize.define('Document', {
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
    document_type: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    upload_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    file_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    notes: {
        type: DataTypes.TEXT,
        allowNull: true,
    }
}, {
    timestamps: false,
});


module.exports = Document;