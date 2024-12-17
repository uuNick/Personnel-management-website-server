// const { sequelize } = require("../db");
const User = require("../models/User");
const bcrypt = require('bcryptjs');

class UserSeed {
    async seed() {
        const userData = [
            {
                username: "Nikita",
                email: "nikitasidarenko@gmail.com",
                password: bcrypt.hashSync('1234nN.', 7)
            }, 
            {
                username: "Inspector",
                email: "inspectortestgmail@gmail.com",
                password: bcrypt.hashSync('4321nN.', 7)
            }
        ];

        try {
            const existingUsers = await User.findAll();

            if (existingUsers.length === 0) {
                await User.bulkCreate(userData);
                console.log("Таблица пользователей успешно заполнена.");
            } else {
                console.log(
                    "Таблица пользователей уже содержит записи. Новые записи не будут добавлены."
                );
            }
        } catch (error) {
            console.error("Ошибка при заполнении таблицы пользователей:", error);
        }
    }
}

module.exports = UserSeed;