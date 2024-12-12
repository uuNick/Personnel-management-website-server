const SickLeave = require('../models/SickLeave');
const { Op } = require('sequelize');

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

    async getAllSickLeavesWithPag(limit, offset) {
        return await SickLeave.findAndCountAll({
            limit: limit,
            offset: offset,
        })
    }

    async getSortedSickLeaves(limit, offset, sortBy, order) {
        return await SickLeave.findAndCountAll({
            order: [[sortBy, order]],
            offset: offset,
            limit: limit,
        });
    }

    async searchSickLeavesByEmployeeId(limit, offset, employee_id) {
        return await SickLeave.findAndCountAll({
            where: {
                employee_id: {
                    [Op.eq]: employee_id
                }
            },
            offset: offset,
            limit: limit,
        });
    }

    async searchSickLeavesByDates(limit, offset, start_date, end_date) {
        return await SickLeave.findAndCountAll({
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