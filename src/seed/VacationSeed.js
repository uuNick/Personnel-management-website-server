// const { sequelize } = require("../db");
const Vacation = require("../models/Vacation");

class VacationSeed {
    async seed() {
        const vacationData = [
            {
                employee_id: 1,
                document_id: 17,
                start_date: '2024-10-01',
                end_date: '2024-10-28',
                type: 'Оплачиваемый'
            }, // correct
            {
                employee_id: 2,
                document_id: 18,
                start_date: '2024-07-01',
                end_date: '2024-07-28',
                type: 'Оплачиваемый'
            }, //correct 
            {
                employee_id: 3,
                document_id: 19,
                start_date: '2024-11-01',
                end_date: '2024-11-28',
                type: 'Оплачиваемый'
            },//correct 
            {
                employee_id: 4,
                document_id: 20,
                start_date: '2024-04-22',
                end_date: '2024-05-19',
                type: 'Оплачиваемый'
            }, //correct
            {
                employee_id: 5,
                document_id: 21,
                start_date: '2024-10-01',
                end_date: '2024-10-28',
                type: 'Оплачиваемый'
            }, //correct
            {
                employee_id: 6,
                document_id: 22,
                start_date: '2024-06-08',
                end_date: '2024-07-04',
                type: 'Оплачиваемый'
            }, // correct
            {
                employee_id: 7,
                document_id: 23,
                start_date: '2024-02-01',
                end_date: '2024-02-28',
                type: 'Оплачиваемый'
            }, //correct
            {
                employee_id: 8,
                document_id: 24,
                start_date: '2024-12-01',
                end_date: '2024-12-28',
                type: 'Оплачиваемый'
            }, //correct
            {
                employee_id: 9,
                document_id: 25,
                start_date: '2024-08-01',
                end_date: '2024-08-28',
                type: 'Оплачиваемый'
            }, // correct
            {
                employee_id: 10,
                document_id: 26,
                start_date: '2024-03-01',
                end_date: '2024-03-28',
                type: 'Оплачиваемый'
            }, // correct
            {
                employee_id: 11,
                document_id: 27,
                start_date: '2024-01-01',
                end_date: '2024-01-28',
                type: 'Оплачиваемый'
            }, // correct
            {
                employee_id: 12,
                document_id: 28,
                start_date: '2024-10-10',
                end_date: '2024-11-07',
                type: 'Оплачиваемый'
            }, // correct
            {
                employee_id: 13,
                document_id: 29,
                start_date: '2024-12-01',
                end_date: '2024-12-28',
                type: 'Оплачиваемый'
            }, // correct
            {
                employee_id: 14,
                document_id: 30,
                start_date: '2024-08-20',
                end_date: '2024-09-16',
                type: 'Оплачиваемый'
            }, // correct
            {
                employee_id: 15,
                document_id: 31,
                start_date: '2024-03-01',
                end_date: '2024-03-28',
                type: 'Оплачиваемый'
            }
        ];

        try {
            const existingVacations = await Vacation.findAll();

            if (existingVacations.length === 0) {
                await Vacation.bulkCreate(vacationData);
                console.log("Таблица отпусков успешно заполнена.");
            } else {
                console.log(
                    "Таблица отпусков уже содержит записи. Новые записи не будут добавлены."
                );
            }
        } catch (error) {
            console.error("Ошибка при заполнении таблицы отпусков:", error);
        }
    }
}

module.exports = VacationSeed;