const DataChange = require("./DataChange");
const DayOff = require("./DayOff");
const Document = require("./Document");
const Employee = require("./Employee");
const Role = require("./Role");
const SickLeave = require("./SickLeave");
const User = require("./User");
const UserRole = require("./UserRole");
const Vacation = require("./Vacation");

User.belongsToMany(Role, { through: UserRole, foreignKey: 'userId' });
Role.belongsToMany(User, { through: UserRole, foreignKey: 'roleId' });

Employee.hasMany(DayOff, { foreignKey: 'employee_id' });
DayOff.belongsTo(Employee, { foreignKey: 'employee_id' });

Employee.hasMany(Vacation, { foreignKey: 'employee_id' });
Vacation.belongsTo(Employee, { foreignKey: 'employee_id' });

Employee.hasMany(SickLeave, { foreignKey: 'employee_id' });
SickLeave.belongsTo(Employee, { foreignKey: 'employee_id' });

Employee.hasMany(Document, { foreignKey: 'employee_id' });
Document.belongsTo(Employee, { foreignKey: 'employee_id' });

Employee.hasMany(DataChange, {foreignKey: 'employee_id'});
DataChange.belongsTo(Employee, { foreignKey: 'employee_id' });

Document.hasOne(Vacation, {foreignKey: 'document_id'});
Vacation.belongsTo(Document, { foreignKey: 'document_id' });

Document.hasOne(SickLeave, {foreignKey: 'document_id'});
SickLeave.belongsTo(Document, { foreignKey: 'document_id' });

User.hasMany(DataChange, {foreignKey: 'user_id'});
DataChange.belongsTo(User, { foreignKey: 'user_id' });



module.exports = {
    DataChange,
    DayOff,
    Document,
    Employee,
    Role,
    SickLeave,
    User,
    UserRole,
    Vacation
};