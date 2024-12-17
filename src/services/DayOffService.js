const DayOff = require('../models/DayOff');
const { Op } = require('sequelize');

class DayOffService {

    async createDayOff(data) {
        return await DayOff.create(data);
    }

    async getAllDaysOff() {
        return await DayOff.findAll();
    }

    async getDayOffById(day_off_id) {
        return await DayOff.findByPk(day_off_id);
    }

    async getAllDaysOffWithPag(limit, offset) {
        return await DayOff.findAndCountAll({
            limit: limit,
            offset: offset,
        })
    }

    async getSortedDaysOff(limit, offset, sortBy, order) {
        return await DayOff.findAndCountAll({
            order: [[sortBy, order]],
            offset: offset,
            limit: limit,
        });
    }

    async searchDaysOffByEmployeeId(limit, offset, employee_id) {
        return await DayOff.findAndCountAll({
            where: {
                employee_id: {
                    [Op.eq]: employee_id
                }
            },
            offset: offset,
            limit: limit,
        });
    }

    async searchDaysOffByDates(limit, offset, start_date, end_date) {
        return await DayOff.findAndCountAll({
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

    async searchByDateAndSortDaysOff(limit, offset, start_date, end_date, sortBy, order) {
        return await DayOff.findAndCountAll({
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

    async updateDayOff(day_off_id, data) {
        const dayOff = await DayOff.findByPk(day_off_id);
        if (!dayOff) {
            throw new Error("Выходной с указанным ID не найден");
        }

        const updatedDayOff = await DayOff.update(
            {
                employee_id: data.employee_id,
                start_date: data.start_date,
                end_date: data.end_date,
                reason: data.reason
            },
            {
                where: { id: day_off_id }
            }
        )
        return updatedDayOff;
    }

    async deleteDayOff(day_off_id) {
        const dayOff = await DayOff.findByPk(day_off_id);
        if (!dayOff) {
            throw new Error("Выходной с указанным ID не найден");
        }
        await dayOff.destroy();
    }
}

module.exports = new DayOffService();