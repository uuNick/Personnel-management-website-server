const PDFService = require('../services/PDFService');

class PDFController {
    async generateReport(req, res) {
        try {

            const {data, name} = req.body || [];

            const pdfBuffer = await PDFService.generatePDF(data, name);
        
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename="report.pdf"');
            res.send(pdfBuffer);
        } catch (error) {
            console.error("Ошибка создания отчёта:", error);
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new PDFController();