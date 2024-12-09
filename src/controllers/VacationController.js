const VacationService = require("../services/VacationService");

class VacationController {

    async createVacation(req, res) {
        const { employee_id, document_id, start_date, end_date, type } = req.body;

        try {
            const vacation = await VacationService.createVacation({ employee_id, document_id, start_date, end_date, type });
            return res.status(201).json(vacation);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async getAllVacations(req, res) {
        try {
            const vacations = await VacationService.getAllVacations();
            return res.status(200).json(vacations);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async getVacationById(req, res) {
        const { vacation_id } = req.params;
        try {
            const vacation = await VacationService.getVacationById(vacation_id);
            if (!vacation) {
                return res.status(404).json({ message: "Отпуск не найден" });
            }
            return res.status(200).json(vacation);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async updateVacation(req, res) {
        const { vacation_id } = req.params;
        const { data } = req.body;
        try {
            const updatedVacation = await VacationService.updateVacation(vacation_id, data);
            if (!updatedVacation) {
                return res.status(404).json({ message: "Отпуск не найден" });
            }
            return res.status(200).json(updatedVacation);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async deleteVacation(req, res) {
        const { vacation_id } = req.params;
        try {
            await VacationService.deleteVacation(vacation_id);
            return res.status(204).send()
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new VacationController();