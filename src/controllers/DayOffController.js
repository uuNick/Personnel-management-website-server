const DayOffService = require("../services/DayOffService");

class DayOffController {

    async createDayOff(req, res) {
        const { employee_id, start_date, end_date, reason } = req.body;

        try {
            const dayOff = await DayOffService.createDayOff({ employee_id, start_date, end_date, reason });
            return res.status(201).json(dayOff);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async getallDaysOff(req, res) {
        try {
            const daysOff = await DayOffService.getAllDaysOff();
            return res.status(200).json(daysOff);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async getDayOffById(req, res) {
        const { day_off_id } = req.params;
        try {
            const dayOff = await DayOffService.getDayOffById(day_off_id);
            if (!dayOff) {
                return res.status(404).json({ message: "Выходной не найден" });
            }
            return res.status(200).json(dayOff);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async getAllDaysOffWithPag(req, res) {
        const { page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;

        try {
            const daysOff = await DayOffService.getAllDaysOffWithPag(limit, offset);

            return res.status(200).json({
                total: daysOff.count,
                pages: Math.ceil(daysOff.count / limit),
                data: daysOff.rows,
            });

        } catch (error) {
            return res.status(500).json({ message: `Ошибка при получении прогулов: ${error.message}`, });
        }
    }

    async getSortedDaysOff(req, res) {
        const {
            sortBy = "start_date", order = "ASC",
            page = 1, limit = 10
        } = req.query;
        const offset = (page - 1) * limit;

        try {
            const sortedDaysOff = await DayOffService.getSortedDaysOff(limit, offset, sortBy, order);
            return res.status(200).json({
                total: sortedDaysOff.count,
                pages: Math.ceil(sortedDaysOff.count / limit),
                data: sortedDaysOff.rows,
            });

        } catch (error) {
            return res.status(500).json({ message: `Ошибка при получении прогулов: ${error.message}`, });
        }
    }

    async searchDaysOffByEmployeeId(req, res) {
        const { employee_id, page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;

        try {
            const daysOff = await DayOffService.searchDaysOffByEmployeeId(limit, offset, employee_id);
            return res.status(200).json({
                total: daysOff.count,
                pages: Math.ceil(daysOff.count / limit),
                data: daysOff.rows,
            });
        } catch (error) {
            console.error("Ошибка при поиске прогулов:", error);
            return res
                .status(500)
                .json({ message: `Ошибка при поиске прогулов: ${error}` });
        }
    }

    async searchAllDaysOffByEmployeeId(req, res) {
        const { employee_id } = req.query;
        try {
            const daysOff = await DayOffService.searchAllDaysOffByEmployeeId(employee_id);
            return res.status(200).json(daysOff.rows);
        } catch (error) {
            console.error("Ошибка при поиске прогулов:", error);
            return res
                .status(500)
                .json({ message: `Ошибка при поиске прогулов: ${error}` });
        }
    }

    async searchDaysOffByDates(req, res) {
        const { start_date, end_date, page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;

        try {
            const daysOff = await DayOffService.searchDaysOffByDates(limit, offset, start_date, end_date);
            return res.status(200).json({
                total: daysOff.count,
                pages: Math.ceil(daysOff.count / limit),
                data: daysOff.rows,
            });
        } catch (error) {
            console.error("Ошибка при поиске прогулов:", error);
            return res
                .status(500)
                .json({ message: `Ошибка при поиске прогулов: ${error}` });
        }
    }

    async searchByDateAndSortDaysOff(req, res) {
        const { start_date, end_date, sortBy = 'start_date', order = "ASC", page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;

        try {
            const daysOff = await DayOffService.searchByDateAndSortDaysOff(limit, offset, start_date, end_date, sortBy, order);
            return res.status(200).json({
                total: daysOff.count,
                pages: Math.ceil(daysOff.count / limit),
                data: daysOff.rows,
            });
        } catch (error) {
            console.error("Ошибка при поиске и сортировке прогулов:", error);
            return res
                .status(500)
                .json({ message: `Ошибка при поиске и сортировке прогулов: ${error}` });
        }
    }

    async updateDayOff(req, res) {
        const { day_off_id } = req.params;
        const { data } = req.body;
        try {
            const updatedDayOff = await DayOffService.updateDayOff(day_off_id, data);
            if (!updatedDayOff) {
                return res.status(404).json({ message: "Выходной не найден" });
            }
            return res.status(200).json(updatedDayOff);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async deleteDayOff(req, res) {
        const { day_off_id } = req.params;
        try {
            await DayOffService.deleteDayOff(day_off_id);
            return res.status(204).send()
        } catch (error) {
            if (error.message.includes('не найден')) {
                res.status(404).json({ message: error.message })
            }
            else {
                return res.status(500).json({ message: error.message });
            }
        }
    }
}

module.exports = new DayOffController();