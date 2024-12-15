const ExcelService = require('../services/ExcelService');
const path = require('path');
const fs = require('node:fs');
const xlsx = require('xlsx');

class ExcelController {
    async generateReport(req, res) {
        try {

            const data = req.body || [];

            const buffer = await ExcelService.generateExcelReport(data);

            res.set({
                'Content-Disposition': 'attachment; filename="report.xlsx"',
                'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            });

            res.send(buffer);
        } catch (error) {
            console.error("Ошибка создания отчёта:", error);
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new ExcelController();