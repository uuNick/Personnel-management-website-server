const DataChange = require("../models/DataChange");
const { Op } = require('sequelize');


class DataChangeService {

    async createDataChange(data_change_data) {
        return await DataChange.create(data_change_data);
    }

    async getAllDataChanges() {
        return await DataChange.findAll();
    }

    async getDataChangeById(data_change_id) {
        return await DataChange.findByPk(data_change_id);
    }

    async getAllDataChangesWithPag(limit, offset) {
        return await DataChange.findAndCountAll({
            limit: limit,
            offset: offset,
        })
    }

    async getSortedDataChanges(limit, offset, sortBy, order) {
        return await DataChange.findAndCountAll({
            order: [[sortBy, order]],
            offset: offset,
            limit: limit,
        });
    }

    async searchDataChangesByDate(limit, offset, start_date, end_date) {
        return await DataChange.findAndCountAll({
            where: {
                date_of_change: {
                    [Op.between]: [start_date, end_date]
                },
            },
            offset: offset,
            limit: limit,
        })
    }

    async searchByDateAndSortDataChanges(limit, offset, start_date, end_date, sortBy, order) {
        return await DataChange.findAndCountAll({
            where: {
                date_of_change: {
                    [Op.between]: [start_date, end_date]
                },
            },
            order: [[sortBy, order]],
            offset: offset,
            limit: limit,
        })
    }

    async deleteDataChange(data_change_id) {
        const dataChange = await DataChange.findByPk(data_change_id);
        if (!dataChange) {
            throw new Error("Запись об изменениях данных с указанным ID не найдена");
        }
        await dataChange.destroy();
    }
}

module.exports = new DataChangeService();