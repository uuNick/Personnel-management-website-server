const DocumentService = require("../services/DocumentService");

class DocumentController {

    async createDocument(req, res) {
        const { employee_id, document_type, upload_date, notes } = req.body;
        const file_name = req.file ? `${req.file.filename}` : null;
        try {
            const document = await DocumentService.createDocument({ employee_id, document_type, upload_date, file_name, notes });
            return res.status(201).json(document);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async gettAllDocuments(req, res) {
        try {
            const documents = await DocumentService.getAllDocuments();
            const documentsWithUrls = documents.map(document => ({
                id: document.id,
                employee_id: document.employee_id,
                document_type: document.document_type,
                upload_date: document.upload_date,
                imageUrl: document.file_name ? `/documents/${document.file_name}` : null,
                notes: document.notes,
            }));
            return res.status(200).json(documentsWithUrls);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async getDocumentById(req, res) {
        const { document_id } = req.params;
        try {
            const document = await DocumentService.getDocumentById(document_id);
            if (!document) {
                return res.status(404).json({ message: "Документ не найден" });
            }
            const documentWithUrls = {
                id: document.id,
                employee_id: document.employee_id,
                document_type: document.document_type,
                upload_date: document.upload_date,
                imageUrl: document.file_name ? `/documents/${document.file_name}` : null,
                notes: document.notes,
            };
            return res.status(200).json(documentWithUrls);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getAllDocumentsWithPag(req, res) {

        const { page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;

        try {
            const documents = await DocumentService.getAllDocumentsWithPag(limit, offset);
            const documentsWithUrls = documents.rows.map(document => ({
                id: document.id,
                employee_id: document.employee_id,
                document_type: document.document_type,
                upload_date: document.upload_date,
                imageUrl: document.file_name ? `/documents/${document.file_name}` : null,
                notes: document.notes,
            }));

            return res.status(200).json({
                total: documents.count,
                pages: Math.ceil(documents.count / limit),
                data: documentsWithUrls,
            });

        } catch (error) {
            return res.status(500).json({ message: `Ошибка при получении документов: ${error.message}`, });
        }
    }

    async getSortedDocuments(req, res) {
        const {
            sortBy = "upload_date", order = "ASC",
            page = 1, limit = 10
        } = req.query;
        const offset = (page - 1) * limit;

        try {
            const sortedDocuments = await DocumentService.getSortedDocuments(limit, offset, sortBy, order);
            const sortedDocumentsWithUrls = sortedDocuments.rows.map(document => ({
                id: document.id,
                employee_id: document.employee_id,
                document_type: document.document_type,
                upload_date: document.upload_date,
                imageUrl: document.file_name ? `/documents/${document.file_name}` : null,
                notes: document.notes,
            }));

            return res.status(200).json({
                total: sortedDocuments.count,
                pages: Math.ceil(sortedDocuments.count / limit),
                data: sortedDocumentsWithUrls,
            });

        } catch (error) {
            return res.status(500).json({ message: `Ошибка при получении документов: ${error.message}`, });
        }
    }

    async searchDocumentsByType(req, res) {
        const { document_type, page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;

        try {
            const documents = await DocumentService.searchDocumentsByType(limit, offset, document_type);

            const documentsWithUrls = documents.rows.map(document => ({
                id: document.id,
                employee_id: document.employee_id,
                document_type: document.document_type,
                upload_date: document.upload_date,
                imageUrl: document.file_name ? `/documents/${document.file_name}` : null,
                notes: document.notes,
            }));

            return res.status(200).json({
                total: documents.count,
                pages: Math.ceil(documents.count / limit),
                data: documentsWithUrls,
            });
        } catch (error) {
            console.error("Ошибка при поиске документов по типу:", error);
            return res
                .status(500)
                .json({ message: `Ошибка при поиске документов по типу: ${error}` });
        }
    }

    async searchDocumentsByEmployeeId(req, res) {
        const { employee_id, page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;

        try {
            const documents = await DocumentService.searchDocumentsByEmployeeId(limit, offset, employee_id);
            const documentsWithUrls = documents.rows.map(document => ({
                id: document.id,
                employee_id: document.employee_id,
                document_type: document.document_type,
                upload_date: document.upload_date,
                imageUrl: document.file_name ? `/documents/${document.file_name}` : null,
                notes: document.notes,
            }));

            return res.status(200).json({
                total: documents.count,
                pages: Math.ceil(documents.count / limit),
                data: documentsWithUrls,
            });
        } catch (error) {
            console.error("Ошибка при поиске отпусков:", error);
            return res
                .status(500)
                .json({ message: `Ошибка при поиске отпусков: ${error}` });
        }
    }

    async updateDocument(req, res) {
        const { document_id } = req.params;
        const { employee_id, document_type, notes } = req.body;
        try {
            const updatedDocument = await DocumentService.updateDocument(document_id, { employee_id, document_type, notes });
            if (!updatedDocument) {
                return res.status(404).json({ message: "Документ не найден" });
            }
            return res.status(200).json(updatedDocument);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async deleteDocument(req, res) {
        const { document_id } = req.params;
        try {
            await DocumentService.deleteDocument(document_id);
            return res.status(204).send()
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new DocumentController();