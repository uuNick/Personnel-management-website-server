const express = require('express');
const router = express.Router();
const DocumentController = require("../controllers/DocumentController");

router.get("/", DocumentController.gettAllDocuments);

router.get("/:document_id", DocumentController.getDocumentById);

router.post("/", DocumentController.createDocument);

router.put("/:document_id", DocumentController.updateDocument);

router.delete("/:document_id", DocumentController.deleteDocument);



module.exports = router;