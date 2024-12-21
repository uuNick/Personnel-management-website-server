const WordService = require('../services/WordService');
class WordController {
    async exportToWord(req, res) {
        try {
            const {data, name} = req.body || [];
            const docBuffer = await WordService.generateWordDocument(data, name);
            res.set({
                'Content-Disposition': 'attachment; filename="document.docx"',
                'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            });
            res.send(docBuffer);
        } catch (error) {
            console.error("Ошибка создания отчёта:", error);
            res.status(500).json({ error: error.message });
        }
    }

    async exportToWordDismiss(req, res) {
        try {
            const data = req.body || [];
            const docBuffer = await WordService.generateDismissDocument(data);
            res.set({
                'Content-Disposition': 'attachment; filename="document.docx"',
                'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            });
            res.send(docBuffer);
        } catch (error) {
            console.error("Ошибка создания заявления на увольнение:", error);
            res.status(500).json({ error: error.message });
        }
    }

    async exportToWordVacation(req, res) {
        try {
            const data = req.body || [];
            const docBuffer = await WordService.generateVacationDocument(data);
            res.set({
                'Content-Disposition': 'attachment; filename="document.docx"',
                'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            });
            res.send(docBuffer);
        } catch (error) {
            console.error("Ошибка создания документа на отпуск:", error);
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new WordController();