const express = require('express');
const router = express.Router();
const DocumentController = require("../controllers/DocumentController");
const upload = require('../multerConfigForDocuments');

router.get("/", DocumentController.gettAllDocuments);

router.get("/pag", DocumentController.getAllDocumentsWithPag);

router.get("/sorted", DocumentController.getSortedDocuments);

router.get("/search_by_type", DocumentController.searchDocumentsByType);

router.get("/search_by_emp_id", DocumentController.searchDocumentsByEmployeeId);

router.get("/:document_id", DocumentController.getDocumentById);

router.post("/", upload.single('pdfFile'), DocumentController.createDocument);

router.patch("/:document_id", DocumentController.updateDocument);

router.delete("/:document_id", DocumentController.deleteDocument);



module.exports = router;