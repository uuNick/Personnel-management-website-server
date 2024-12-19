const SickLeaveService = require("../services/SickLeaveService");

class SickLeaveController {

    async createSickLeave(req, res) {
        const { employee_id, document_id, start_date, end_date, diagnosis } = req.body;

        try {
            const sickLeave = await SickLeaveService.createSickLeave({ employee_id, document_id, start_date, end_date, diagnosis });
            return res.status(201).json(sickLeave);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async getAllSickLeaves(req, res) {
        try {
            const sickLeaves = await SickLeaveService.getAllSickLeaves();
            return res.status(200).json(sickLeaves);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async getSickLeaveById(req, res) {
        const { sick_leave_id } = req.params;
        try {
            const sickLeave = await SickLeaveService.getSickLeaveById(sick_leave_id);
            if (!sickLeave) {
                return res.status(404).json({ message: "Больничный лист не найден" });
            }
            return res.status(200).json(sickLeave);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async getAllSickLeavesWithPag(req, res) {
        const { page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;

        try {
            const sickLeaves = await SickLeaveService.getAllSickLeavesWithPag(limit, offset);

            return res.status(200).json({
                total: sickLeaves.count,
                pages: Math.ceil(sickLeaves.count / limit),
                data: sickLeaves.rows,
            });

        } catch (error) {
            return res.status(500).json({ message: `Ошибка при получении больничных листов: ${error.message}`, });
        }
    }

    async getSortedSickLeaves(req, res) {
        const {
            sortBy = "start_date", order = "ASC",
            page = 1, limit = 10
        } = req.query;
        const offset = (page - 1) * limit;

        try {
            const sortedSickLeaves = await SickLeaveService.getSortedSickLeaves(limit, offset, sortBy, order);
            return res.status(200).json({
                total: sortedSickLeaves.count,
                pages: Math.ceil(sortedSickLeaves.count / limit),
                data: sortedSickLeaves.rows,
            });

        } catch (error) {
            return res.status(500).json({ message: `Ошибка при получении больничных листов: ${error.message}`, });
        }
    }

    async searchSickLeavesByEmployeeId(req, res) {
        const { employee_id, page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;

        try {
            const sickLeaves = await SickLeaveService.searchSickLeavesByEmployeeId(limit, offset, employee_id);
            return res.status(200).json({
                total: sickLeaves.count,
                pages: Math.ceil(sickLeaves.count / limit),
                data: sickLeaves.rows,
            });
        } catch (error) {
            console.error("Ошибка при поиске больничных листов:", error);
            return res
                .status(500)
                .json({ message: `Ошибка при поиске больничных листов: ${error}` });
        }
    }

    async searchAllSickLeavesByEmployeeId(req, res) {
        const { employee_id } = req.query;
        try {
            const sickLeaves = await SickLeaveService.searchAllSickLeavesByEmployeeId(employee_id);
            return res.status(200).json(sickLeaves.rows);
        } catch (error) {
            console.error("Ошибка при поиске больничных листов:", error);
            return res
                .status(500)
                .json({ message: `Ошибка при поиске больничных листов: ${error}` });
        }
    }

    async searchSickLeavesByDates(req, res) {
        const { start_date, end_date, page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;

        try {
            const sickLeaves = await SickLeaveService.searchSickLeavesByDates(limit, offset, start_date, end_date);
            return res.status(200).json({
                total: sickLeaves.count,
                pages: Math.ceil(sickLeaves.count / limit),
                data: sickLeaves.rows,
            });
        } catch (error) {
            console.error("Ошибка при поиске больничных листов:", error);
            return res
                .status(500)
                .json({ message: `Ошибка при поиске больничных листов: ${error}` });
        }
    }

    async searchByDateAndSortSickLeaves(req, res) {
        const { start_date, end_date, sortBy = 'document_id', order = "ASC", page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;

        try {
            const sickLeaves = await SickLeaveService.searchByDateAndSortSickLeaves(limit, offset, start_date, end_date, sortBy, order);
            return res.status(200).json({
                total: sickLeaves.count,
                pages: Math.ceil(sickLeaves.count / limit),
                data: sickLeaves.rows,
            });
        } catch (error) {
            console.error("Ошибка при поиске и сортировке больничных листов:", error);
            return res
                .status(500)
                .json({ message: `Ошибка при поиске и сортировке больничных листов: ${error}` });
        }
    }

    async updateSickLeave(req, res) {
        const { sick_leave_id } = req.params;
        const { data } = req.body;
        try {
            const updatedSickLeave = await SickLeaveService.updateSickLeave(sick_leave_id, data);
            if (!updatedSickLeave) {
                return res.status(404).json({ message: "Больничный лист не найден" });
            }
            return res.status(200).json(updatedSickLeave);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async deleteSickLeave(req, res) {
        const { sick_leave_id } = req.params;
        try {
            await SickLeaveService.deleteSickLeave(sick_leave_id);
            return res.status(204).send()
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new SickLeaveController();