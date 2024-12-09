const Document = require('../models/Document');

class DocumentService {

    async createDocument(data) {
        return await Document.create(data);
    }

    async getAllDocuments() {
        return await Document.findAll();
    }

    async getDocumentById(document_id) {
        return await Document.findByPk(document_id);
    }

    async updateDocument(document_id, data) {
        const document = await Document.findByPk(document_id);
        if (!document) {
            throw new Error("Документ с указанным ID не найден");
        }

        const updatedDocument = await Document.update(
            {
                employee_id: data.employee_id,
                document_type: data.document_type,
                file_name: data.file_name,
                notes: data.notes
                //upload_date не указана
            },
            {
                where: { id: document_id }
            }
        )
        return updatedDocument;
    }

    async deleteDocument(document_id) {
        const document = await DayOff.findByPk(document_id);
        if (!document) {
            throw new Error("Документ с указанным ID не найден");
        }
        await document.destroy();
    }
}

module.exports = new DocumentService();