// const { sequelize } = require("../db");
const Role = require("../models/Role");

class RoleSeed {
    async seed() {
        const roleData = [
            {
                roleName: "ИНСПЕКТОР"
            }, 
            {
                roleName: "РУКОВОДИТЕЛЬ"
            }
        ];

        try {
            const existingRoles = await Role.findAll();

            if (existingRoles.length === 0) {
                await Role.bulkCreate(roleData);
                console.log("Таблица ролей успешно заполнена.");
            } else {
                console.log(
                    "Таблица ролей уже содержит записи. Новые записи не будут добавлены."
                );
            }
        } catch (error) {
            console.error("Ошибка при заполнении талицы ролей:", error);
        }
    }
}

module.exports = RoleSeed;