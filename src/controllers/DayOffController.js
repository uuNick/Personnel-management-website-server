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
            return res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new DayOffController();