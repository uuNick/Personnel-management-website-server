// const { sequelize } = require("../db");
const SickLeave = require("../models/SickLeave");

class SickLeaveSeed {
    async seed() {
        const sickLeavesData = [
            {
                employee_id: 1,
                document_id: 1,
                start_date: '2024-01-15',
                end_date: '2024-01-20',
                diagnosis: 'Грипп'
            }, // correct
            {
                employee_id: 1,
                document_id: 2,
                start_date: '2024-08-12',
                end_date: '2024-08-15',
                diagnosis: 'Бронхит'
            }, //correct 
            {
                employee_id: 2,
                document_id: 3,
                start_date: '2024-03-11',
                end_date: '2024-03-15',
                diagnosis: 'Кашель'
            },//correct 
            {
                employee_id: 2,
                document_id: 4,
                start_date: '2024-10-07',
                end_date: '2024-10-11',
                diagnosis: 'Инфекция'
            }, //correct
            {
                employee_id: 3,
                document_id: 5,
                start_date: '2024-07-01',
                end_date: '2024-07-05',
                diagnosis: 'Кашель'
            }, //correct
            {
                employee_id: 4,
                document_id: 6,
                start_date: '2024-09-09',
                end_date: '2024-09-13',
                diagnosis: null
            }, // correct
            {
                employee_id: 4,
                document_id: 7,
                start_date: '2024-12-02',
                end_date: '2024-12-06',
                diagnosis: 'Грипп'
            }, //correct
            {
                employee_id: 5,
                document_id: 8,
                start_date: '2024-02-05',
                end_date: '2024-02-09',
                diagnosis: null
            }, //correct
            {
                employee_id: 5,
                document_id: 9,
                start_date: '2024-02-19',
                end_date: '2024-02-22',
                diagnosis: 'Грипп'
            }, // correct
            {
                employee_id: 6,
                document_id: 10,
                start_date: '2024-04-01',
                end_date: '2024-04-05',
                diagnosis: null
            }, // correct
            {
                employee_id: 7,
                document_id: 11,
                start_date: '2024-11-11',
                end_date: '2024-11-22',
                diagnosis: 'Травма головы'
            }, // correct
            {
                employee_id: 8,
                document_id: 12,
                start_date: '2024-01-22',
                end_date: '2024-02-02',
                diagnosis: 'Пневмония'
            }, // correct
            {
                employee_id: 9,
                document_id: 13,
                start_date: '2024-09-16',
                end_date: '2024-09-20',
                diagnosis: null
            }, // correct
            {
                employee_id: 9,
                document_id: 14,
                start_date: '2024-10-14',
                end_date: '2024-10-18',
                diagnosis: 'Кашель'
            }, // correct
            {
                employee_id: 14,
                document_id: 15,
                start_date: '2024-05-13',
                end_date: '2024-05-17',
                diagnosis: 'Бронхит'
            }, // correct 
            {
                employee_id: 15,
                document_id: 16,
                start_date: '2024-06-17',
                end_date: '2024-06-21',
                diagnosis: null
            } // correct
        ];

        try {
            const existingSickLeaves = await SickLeave.findAll();

            if (existingSickLeaves.length === 0) {
                await SickLeave.bulkCreate(sickLeavesData);
                console.log("База данных больничных листов успешно заполнена.");
            } else {
                console.log(
                    "База данных больничных листов уже содержит записи. Новые записи не будут добавлены."
                );
            }
        } catch (error) {
            console.error("Ошибка при заполнении базы данных больничных листов:", error);
        }
    }
}

module.exports = SickLeaveSeed;