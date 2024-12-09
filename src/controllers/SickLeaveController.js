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