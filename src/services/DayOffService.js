const DayOff = require('../models/DayOff');

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