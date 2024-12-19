const Document = require('../models/Document');
const fs = require('node:fs');
const path = require('node:path');
const { Op } = require('sequelize');

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

    async getAllDocumentsWithPag(limit, offset) {
        return await Document.findAndCountAll({
            limit: limit,
            offset: offset,
        })
    }

    async getSortedDocuments(limit, offset, sortBy, order) {
        return await Document.findAndCountAll({
            order: [[sortBy, order]],
            offset: offset,
            limit: limit,
        });
    }

    async searchDocumentsByType(limit, offset, search) {
        return await Document.findAndCountAll({
            where: {
                [Op.or]: [
                    { document_type: { [Op.like]: `%${search}%` } },
                ],
            },
            offset: offset,
            limit: limit,
        })
    }

    async searchDocumentsByEmployeeId(limit, offset, employee_id) {
        return await Document.findAndCountAll({
            where: {
                employee_id: {
                    [Op.eq]: employee_id
                }
            },
            offset: offset,
            limit: limit,
        })
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
                notes: data.notes
            },
            {
                where: { id: document_id }
            }
        )
        return updatedDocument;
    }

    deleteImage(file_name) {
        const imagePath = path.join(__dirname, '..', 'uploads', 'documents', file_name);

        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
            console.log(`Фотография ${imagePath} успешно удалена.`);
        } else {
            console.log(`Фотография ${imagePath} не найдена.`);
        }
    }

    async deleteDocument(document_id) {
        const document = await Document.findByPk(document_id);
        if (!document) {
            throw new Error("Документ с указанным ID не найден");
        }
        this.deleteImage(document.file_name);
        await document.destroy();
    }
}

module.exports = new DocumentService();