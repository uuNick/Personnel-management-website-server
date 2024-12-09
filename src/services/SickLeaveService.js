const SickLeave = require('../models/SickLeave');

class SickLeaveService {

    async createSickLeave(data) {
        return await SickLeave.create(data);
    }

    async getAllSickLeaves() {
        return await SickLeave.findAll();
    }

    async getSickLeaveById(sick_leave_id) {
        return await SickLeave.findByPk(sick_leave_id);
    }

    async updateSickLeave(sick_leave_id, data) {
        const sickLeave = await SickLeave.findByPk(sick_leave_id);
        if (!sickLeave) {
            throw new Error("Больничный лист с указанным ID не найден");
        }

        const updatedSickLeave = await SickLeave.update(
            {
                employee_id: data.employee_id,
                document_id: data.document_id,
                start_date: data.start_date,
                end_date: data.end_date,
                diagnosis: data.diagnosis
            },
            {
                where: { id: sick_leave_id }
            }
        )
        return updatedSickLeave;
    }

    async deleteSickLeave(sick_leave_id) {
        const sickLeave = await SickLeave.findByPk(sick_leave_id);
        if (!sickLeave) {
            throw new Error("Больничный лист с указанным ID не найден");
        }
        await sickLeave.destroy();
    }
}

module.exports = new SickLeaveService();