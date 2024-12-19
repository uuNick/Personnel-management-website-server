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

    async getAllVacationsWithPag(req, res) {
        const { page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;

        try {
            const vacations = await VacationService.getAllVacationsWithPag(limit, offset);

            return res.status(200).json({
                total: vacations.count,
                pages: Math.ceil(vacations.count / limit),
                data: vacations.rows,
            });

        } catch (error) {
            return res.status(500).json({ message: `Ошибка при получении отпусков: ${error.message}`, });
        }
    }

    async getSortedVacations(req, res) {
        const {
            sortBy = "start_date", order = "ASC",
            page = 1, limit = 10
        } = req.query;
        const offset = (page - 1) * limit;

        try {
            const sortedVacations = await VacationService.getSortedVacations(limit, offset, sortBy, order);
            return res.status(200).json({
                total: sortedVacations.count,
                pages: Math.ceil(sortedVacations.count / limit),
                data: sortedVacations.rows,
            });

        } catch (error) {
            return res.status(500).json({ message: `Ошибка при получении отпусков: ${error.message}`, });
        }
    }

    async searchVacationsByEmployeeId(req, res) {
        const { employee_id, page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;

        try {
            const vacations = await VacationService.searchVacationsByEmployeeId(limit, offset, employee_id);
            return res.status(200).json({
                total: vacations.count,
                pages: Math.ceil(vacations.count / limit),
                data: vacations.rows,
            });
        } catch (error) {
            console.error("Ошибка при поиске отпусков:", error);
            return res
                .status(500)
                .json({ message: `Ошибка при поиске отпусков: ${error}` });
        }
    }

    async searchAllVacationsByEmployeeId(req, res) {
        const { employee_id } = req.query;
        try {
            const vacations = await VacationService.searchAllVacationsByEmployeeId(employee_id);
            return res.status(200).json(vacations.rows);
        } catch (error) {
            console.error("Ошибка при поиске отпусков:", error);
            return res
                .status(500)
                .json({ message: `Ошибка при поиске отпусков: ${error}` });
        }
    }

    async searchVacationsByDates(req, res) {
        const { start_date, end_date, page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;
        try {
            const vacations = await VacationService.searchVacationsByDates(limit, offset, start_date, end_date);
            return res.status(200).json({
                total: vacations.count,
                pages: Math.ceil(vacations.count / limit),
                data: vacations.rows,
            });
        } catch (error) {
            console.error("Ошибка при поиске отпусков:", error);
            return res
                .status(500)
                .json({ message: `Ошибка при поиске отпусков: ${error}` });
        }
    }

    async searchByDateAndSortVacations(req, res) {
        const { start_date, end_date, sortBy = 'document_id', order = "ASC", page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;

        try {
            const vacations = await VacationService.searchByDateAndSortVacations(limit, offset, start_date, end_date, sortBy, order);
            return res.status(200).json({
                total: vacations.count,
                pages: Math.ceil(vacations.count / limit),
                data: vacations.rows,
            });
        } catch (error) {
            console.error("Ошибка при поиске и сортировке отпусков:", error);
            return res
                .status(500)
                .json({ message: `Ошибка при поиске и сортировке отпусков: ${error}` });
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