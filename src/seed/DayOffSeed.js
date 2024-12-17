const DayOff = require("../models/DayOff");

class DayOffSeed {
    async seed() {
        const dayOffData = [
            {
                employee_id: 1,
                start_date: '2024-08-21',
                end_date: '2024-08-22',
                reason: 'По семейный обстоятельствам'
            }, // correct
            {
                employee_id: 1,
                start_date: '2024-05-10',
                end_date: '2024-05-13',
                reason: 'Выходные'
            }, //correct 
            {
                employee_id: 2,
                start_date: '2024-03-27',
                end_date: '2024-03-29',
                reason: 'По семейным обстоятельствам'
            },//correct 
            {
                employee_id: 2,
                start_date: '2024-01-03',
                end_date: '2024-01-05',
                reason: 'По семейный обстоятельствам'
            }, //correct
            {
                employee_id: 3,
                start_date: '2024-07-15',
                end_date: '2024-07-15',
                reason: 'Выходные'
            }, //correct
            {
                employee_id: 3,
                start_date: '2024-02-03',
                end_date: '2024-02-08',
                reason: 'Больничный без справки'
            }, // correct
            {
                employee_id: 4,
                start_date: '2024-04-17',
                end_date: '2024-04-18',
                reason: 'Выходные'
            }, //correct
            {
                employee_id: 4,
                start_date: '2024-11-14',
                end_date: '2024-11-18',
                reason: 'По семейный обстоятельствам'
            }, //correct
            {
                employee_id: 5,
                start_date: '2024-09-24',
                end_date: '2024-09-26',
                reason: 'Выходные'
            }, // correct
            {
                employee_id: 5,
                start_date: '2024-01-08',
                end_date: '2024-01-10',
                reason: 'Больничный без справки'
            }, // correct
            {
                employee_id: 6,
                start_date: '2024-06-04',
                end_date: '2024-06-06',
                reason: 'По семейный обстоятельствам'
            }, // correct
            {
                employee_id: 6,
                start_date: '2024-04-24',
                end_date: '2024-04-26',
                reason: 'Выходные'
            }, // correct
            {
                employee_id: 7,
                start_date: '2024-03-14',
                end_date: '2024-03-21',
                reason: 'Выходные'
            }, // correct
            {
                employee_id: 7,
                start_date: '2024-11-11',
                end_date: '2024-11-11',
                reason: 'По семейный обстоятельствам'
            }, // correct
            {
                employee_id: 8,
                start_date: '2024-11-14',
                end_date: '2024-11-18',
                reason: 'Выходные'
            },
            {
                employee_id: 8,
                start_date: '2024-02-06',
                end_date: '2024-02-08',
                reason: 'Выходные'
            }, // correct
            {
                employee_id: 9,
                start_date: '2024-03-08',
                end_date: '2024-03-08',
                reason: 'По семейный обстоятельствам'
            }, // correct
            {
                employee_id: 10,
                start_date: '2024-02-15',
                end_date: '2024-02-16',
                reason: 'Выходные'
            }, // correct
            {
                employee_id: 10,
                start_date: '2024-12-25',
                end_date: '2024-12-27',
                reason: 'По семейный обстоятельствам'
            }, // correct
            {
                employee_id: 11,
                start_date: '2024-01-30',
                end_date: '2024-01-30',
                reason: 'Выходные'
            }, // correct
            {
                employee_id: 13,
                start_date: '2024-05-20',
                end_date: '2024-05-23',
                reason: 'Больничный без справки'
            }, // correct
            {
                employee_id: 13,
                start_date: '2024-06-12',
                end_date: '2024-06-13',
                reason: 'По семейный обстоятельствам'
            }, // correct
            {
                employee_id: 14,
                start_date: '2024-08-12',
                end_date: '2024-08-13',
                reason: 'Выходные'
            }, // correct
            {
                employee_id: 14,
                start_date: '2024-05-08',
                end_date: '2024-05-10',
                reason: 'Выходные'
            }, // correct
        ];

        try {
            const existingDayOffs = await DayOff.findAll();

            if (existingDayOffs.length === 0) {
                await DayOff.bulkCreate(dayOffData);
                console.log("Таблица прогулов успешно заполнена.");
            } else {
                console.log(
                    "Таблица прогулов уже содержит записи. Новые записи не будут добавлены."
                );
            }
        } catch (error) {
            console.error("Ошибка при заполнении таблицы прогулов:", error);
        }
    }
}

module.exports = DayOffSeed;