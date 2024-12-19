const Vacation = require('../models/Vacation');
const { Op } = require('sequelize');

class VacationService {

    async createVacation(data) {
        return await Vacation.create(data);
    }

    async getAllVacations() {
        return await Vacation.findAll();
    }

    async getVacationById(vacation_id) {
        return await Vacation.findByPk(vacation_id);
    }

    async getAllVacationsWithPag(limit, offset) {
        return await Vacation.findAndCountAll({
            limit: limit,
            offset: offset,
        })
    }

    async getSortedVacations(limit, offset, sortBy, order) {
        return await Vacation.findAndCountAll({
            order: [[sortBy, order]],
            offset: offset,
            limit: limit,
        });
    }

    async searchVacationsByEmployeeId(limit, offset, employee_id) {
        return await Vacation.findAndCountAll({
            where: {
                employee_id: {
                    [Op.eq]: employee_id
                }
            },
            offset: offset,
            limit: limit,
        });
    }

    async searchAllVacationsByEmployeeId(employee_id) {
        return await Vacation.findAndCountAll({
            where: {
                employee_id: {
                    [Op.eq]: employee_id
                }
            }
        });
    }

    async searchVacationsByDates(limit, offset, start_date, end_date) {
        return await Vacation.findAndCountAll({
            where: {
                start_date: {
                    [Op.between]: [start_date, end_date]
                },
                end_date: { //учитывем случаи, когда больничный лист может начаться до start_date, но закончиться после start_date и до end_date.
                    [Op.between]: [start_date, end_date]
                }
            },
            offset: offset,
            limit: limit,
        })
    }

    async searchByDateAndSortVacations(limit, offset, start_date, end_date, sortBy, order) {
        return await Vacation.findAndCountAll({
            where: {
                start_date: {
                    [Op.between]: [start_date, end_date]
                },
                end_date: { //учитывем случаи, когда больничный лист может начаться до start_date, но закончиться после start_date и до end_date.
                    [Op.between]: [start_date, end_date]
                }
            },
            order: [[sortBy, order]],
            offset: offset,
            limit: limit,
        })
    }


    async updateVacation(vacation_id, data) {
        const vacation = await Vacation.findByPk(vacation_id);
        if (!vacation) {
            throw new Error("Отпуск с указанным ID не найден");
        }

        const updatedVacation = await Vacation.update(
            {
                employee_id: data.employee_id,
                document_id: data.document_id,
                start_date: data.start_date,
                end_date: data.end_date,
                type: data.type
            },
            {
                where: { id: vacation_id }
            }
        )
        return updatedVacation;
    }

    async deleteVacation(vacation_id) {
        const vacation = await Vacation.findByPk(vacation_id);
        if (!vacation) {
            throw new Error("Отпуск с указанным ID не найден");
        }
        await vacation.destroy();
    }
}

module.exports = new VacationService();