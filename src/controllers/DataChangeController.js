const DataChangeService = require("../services/DataChangeService");

class DataChangeController {

    async createDataChange(req, res) {
        const { employee_id, user_id, date_of_change, type_of_change } = req.body;

        try {
            const dataChange = await DataChangeService.createDataChange({ employee_id, user_id, date_of_change, type_of_change });
            return res.status(201).json(dataChange);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async getallDataChanges(req, res) {
        try {
            const dataChanges = await DataChangeService.getAllDataChanges();
            return res.status(200).json(dataChanges);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async getDataChangeById(req, res) {
        const { data_change_id } = req.params;
        try {
            const dataChange = await DataChangeService.getDataChangeById(data_change_id);
            if (!dataChange) {
                return res.status(404).json({ message: "Запись об изменениях не найдена" });
            }
            return res.status(200).json(dataChange);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async deleteDataChange(req, res){
        const {data_change_id} = req.params;
        try{
            await DataChangeService.deleteDataChange(data_change_id);
            return res.status(204).send() 
        }catch(error){
            return res.status(500).json({message: error.message});
        }
    }
}

module.exports = new DataChangeController();