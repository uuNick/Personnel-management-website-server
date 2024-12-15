const WordService = require('../services/WordService');
class WordController {
    async exportToWord(req, res) {
        try {
            const data = req.body || [];
            console.log(data);
            const docBuffer = await WordService.generateWordDocument(data);
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
}

module.exports = new WordController();