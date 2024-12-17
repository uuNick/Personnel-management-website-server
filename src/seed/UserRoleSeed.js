// const { sequelize } = require("../db");
const UserRole = require("../models/UserRole");

class UserRoleSeed {
    async seed() {
        const UserRoleData = [
            {
                userId: 1,
                roleId: 2,
            }, 
            {
                userId: 2,
                roleId: 1,
            }
        ];

        try {
            const existingUserRoles = await UserRole.findAll();

            if (existingUserRoles.length === 0) {
                await UserRole.bulkCreate(UserRoleData);
                console.log("Таблица ролей пользователей успешно заполнена.");
            } else {
                console.log(
                    "Таблица ролей пользователей уже содержит записи. Новые записи не будут добавлены."
                );
            }
        } catch (error) {
            console.error("Ошибка при заполнении талицы ролей пользователей:", error);
        }
    }
}

module.exports = UserRoleSeed;