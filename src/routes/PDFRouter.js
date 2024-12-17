const express = require('express');
const router = express.Router();
const PDFController = require('../controllers/PDFController');

router.post('/generate', PDFController.generateReport);

module.exports = router;