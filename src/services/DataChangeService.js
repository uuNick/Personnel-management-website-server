const DataChange = require("../models/DataChange");

class DataChangeService {

    async createDataChange(data_change_data){
        return await DataChange.create(data_change_data);
    }

    async getAllDataChanges() {
        return await DataChange.findAll();
    }

    async getDataChangeById(data_change_id) {
        return await DataChange.findByPk(data_change_id);
    }

    async deleteDataChange(data_change_id){
        const dataChange = await DataChange.findByPk(data_change_id);
        if(!dataChange){
            throw new Error("Запись об изменениях данных с указанным ID не найдена");
        }
        await dataChange.destroy(); 
    }
}

module.exports = new DataChangeService();