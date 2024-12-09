const Vacation = require('../models/Vacation');

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