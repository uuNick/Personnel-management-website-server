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

    async getAllDataChangesWithPag(req, res) {
        const { page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;

        try {
            const dataChanges = await DataChangeService.getAllDataChangesWithPag(limit, offset);

            return res.status(200).json({
                total: dataChanges.count,
                pages: Math.ceil(dataChanges.count / limit),
                data: dataChanges.rows,
            });

        } catch (error) {
            return res.status(500).json({ message: `Ошибка при получении изменений: ${error.message}`, });
        }
    }

    async getSortedDataChanges(req, res) {
        const {
            sortBy = "date_of_change", order = "ASC",
            page = 1, limit = 10
        } = req.query;
        const offset = (page - 1) * limit;

        try {
            const sortedDataChanges = await DataChangeService.getSortedDataChanges(limit, offset, sortBy, order);
            return res.status(200).json({
                total: sortedDataChanges.count,
                pages: Math.ceil(sortedDataChanges.count / limit),
                data: sortedDataChanges.rows,
            });

        } catch (error) {
            return res.status(500).json({ message: `Ошибка при получении изменений: ${error.message}`, });
        }
    }

    async searchDataChangesByDate(req, res) {
        const { start_date, end_date, page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;
        try {
            const dataChanges = await DataChangeService.searchDataChangesByDate(limit, offset, start_date, end_date);
            return res.status(200).json({
                total: dataChanges.count,
                pages: Math.ceil(dataChanges.count / limit),
                data: dataChanges.rows,
            });
        } catch (error) {
            console.error("Ошибка при поиске изменений:", error);
            return res
                .status(500)
                .json({ message: `Ошибка при поиске изменений: ${error}` });
        }
    }

    async searchByDateAndSortDataChanges(req, res) {
        const { start_date, end_date, sortBy = 'date_of_change', order = "ASC", page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;

        try {
            const dataChanges = await DataChangeService.searchByDateAndSortDataChanges(limit, offset, start_date, end_date, sortBy, order);
            return res.status(200).json({
                total: dataChanges.count,
                pages: Math.ceil(dataChanges.count / limit),
                data: dataChanges.rows,
            });
        } catch (error) {
            console.error("Ошибка при поиске и сортировке изменений:", error);
            return res
                .status(500)
                .json({ message: `Ошибка при поиске и сортировке изменений: ${error}` });
        }
    }

    async deleteDataChange(req, res) {
        const { data_change_id } = req.params;
        try {
            await DataChangeService.deleteDataChange(data_change_id);
            return res.status(204).send()
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new DataChangeController();