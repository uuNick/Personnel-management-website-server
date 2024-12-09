const DocumentService = require("../services/DocumentService");

class DocumentController {

    async createDocument(req, res) {
        const { employee_id, document_type, upload_date, file_name, notes } = req.body;

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
            return res.status(200).json(documents);
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
            return res.status(200).json(document);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateDocument(req, res) {
        const { document_id } = req.params;
        const { data } = req.body;
        try {
            const updatedDocument = await DayOffService.updateDayOff(document_id, data);
            if (!updatedDocument) {
                return res.status(404).json({ message: "Документ не найден" });
            }
            return res.status(200).json(updatedDocument);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async deleteDocument(req, res){
        const {document_id} = req.params;
        try{
            await DocumentService.deleteDocument(document_id);
            return res.status(204).send() 
        }catch(error){
            return res.status(500).json({message: error.message});
        }
    }
}

module.exports = new DocumentController();