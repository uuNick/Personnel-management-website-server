// const { sequelize } = require("../db");
const Employee = require("../models/Employee");

class EmployeeSeed {
    async seed() {
        const employeesData = [
            {
                fullname: 'Alex Nervoy Lesgoy',
                birth_date: '1990-05-20',
                position: 'Программист',
                start_date: '2020-01-15',
                phone_number: '+79123456789',
                email: 'testmail1@gmail.com',
                address: 'address 1',
                image_name: 'image-1733855795131-117985861.png'
            },
            {
                fullname: 'Dasha Kenya Resteria',
                birth_date: '2000-04-12',
                position: 'Инженер',
                start_date: '2023-04-10',
                phone_number: '+37564920382332',
                email: 'testmail2@gmail.com',
                address: 'address 2',
                image_name: 'image-1733855861654-863334404.png'
            },
            {
                fullname: 'Misha Egorov Sergeevish',
                birth_date: '1985-11-01',
                position: 'Менеджер',
                start_date: '2018-07-20',
                phone_number: '+79991112233',
                email: 'testmail3@gmail.com',
                address: 'address 3efcrr',
                image_name: 'image-1733855868988-753926040.png'
            },
            {
                fullname: 'Masha Volkova Dimidova',
                birth_date: '1995-03-08',
                position: 'Дизайнер',
                start_date: '2022-05-05',
                phone_number: '+79001234567',
                email: 'testmail4@gmail.com',
                address: 'address 4',
                image_name: 'image-1733855876392-299079694.png'
            },
            {
                fullname: 'Wenson Alya Alya',
                birth_date: '1978-09-15',
                position: 'Аналитик',
                start_date: '2015-12-10',
                phone_number: '+78005556677',
                email: 'testmail5@gmail.com',
                address: 'address 5',
                image_name: 'image-1733855883084-95430802.png'
            },
            {
                fullname: 'Katya Groya Mia',
                birth_date: '1992-07-28',
                position: 'Тестировщик',
                start_date: '2021-02-22',
                phone_number: '+79219876543',
                email: 'testmail6@gmail.com',
                address: 'address 6',
                image_name: 'image-1733855890573-637773391.png'
            },
            {
                fullname: 'Ivan Ivanov',
                birth_date: '1985-03-15',
                position: 'Программист',
                start_date: '2020-05-10',
                phone_number: '+79111234567',
                email: 'ivan.ivanov@example.com',
                address: 'ул. Ленина, 10',
                image_name: null
            },
            {
                fullname: 'Maria Petrova',
                birth_date: '1990-11-20',
                position: 'Дизайнер',
                start_date: '2022-01-15',
                phone_number: '+79225556666',
                email: 'maria.petrova@example.com',
                address: 'пр. Мира, 5',
                image_name: null
            },
            {
                fullname: 'Sergey Sidorov',
                birth_date: '1978-06-05',
                position: 'Менеджер',
                start_date: '2019-09-01',
                phone_number: '+79127778888',
                email: 'sergey.sidorov@example.com',
                address: 'ул. Кирова, 22',
                image_name: null
            }, // 9
            {
                fullname: 'Anna Volkova',
                birth_date: '1995-04-10',
                position: 'Аналитик',
                start_date: '2023-03-01',
                phone_number: '+79231112222',
                email: 'anna.volkova@example.com',
                address: 'ул. Пушкина, 15',
                image_name: null
            }, // 10
            {
                fullname: 'Dmitry Smirnov',
                birth_date: '1982-08-25',
                position: 'Архитектор',
                start_date: '2021-11-10',
                phone_number: '+79133334444',
                email: 'dmitry.smirnov@example.com',
                address: 'ул. Толстого, 30',
                image_name: null
            }, //11
            {
                fullname: 'Elena Sokolova',
                birth_date: '1998-01-18',
                position: 'Маркетолог',
                start_date: '2022-07-01',
                phone_number: '+79244445555',
                email: 'elena.sokolova@example.com',
                address: 'ул. Горького, 12',
                image_name: null
            }, //12
            {
                fullname: 'Oleg Kuznecov',
                birth_date: '1987-09-12',
                position: 'Системный администратор',
                start_date: '2020-02-20',
                phone_number: '+79156667777',
                email: 'oleg.kuznecov@example.com',
                address: 'ул. Чехова, 8',
                image_name: null
            }, //13
            {
                fullname: 'Alexey Kozlov',
                birth_date: '1980-12-28',
                position: 'Руководитель проекта',
                start_date: '2018-04-01',
                phone_number: '79170001111',
                email: null,
                address: 'ул. Грибоедова, 7',
                image_name: 'image-1733993164821-668210198.png'
            }, //14
            {
                fullname: 'Natalia Morozova',
                birth_date: '1997-07-08',
                position: 'Бухгалтер',
                start_date: '2023-06-10',
                phone_number: '+79282223333',
                email: null,
                address: 'ул. Невского',
                image_name: 'image-1734001100055-112510990.png'
            },
            {
                fullname: 'Svetlana Pavlova',
                birth_date: '1993-05-02',
                position: 'Секретарь',
                start_date: '2021-08-15',
                phone_number: '+79268889999',
                email: 'svetlana.pavlova@example.com',
                address: 'Могилев, ул. Королева, 25',
                image_name: null
            }
        ];

        try {
            const existingEmployees = await Employee.findAll();

            if (existingEmployees.length === 0) {
                await Employee.bulkCreate(employeesData);
                console.log("База данных сотрудников успешно заполнена.");
            } else {
                console.log(
                    "База данных сотрудников уже содержит записи. Новые записи не будут добавлены."
                );
            }
        } catch (error) {
            console.error("Ошибка при заполнении базы данных сотрудников:", error);
        }
    }
}

module.exports = EmployeeSeed;