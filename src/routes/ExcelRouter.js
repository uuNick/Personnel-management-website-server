const express = require('express');
const router = express.Router();
const ExcelController = require('../controllers/ExcelController');

router.post('/generate', ExcelController.generateReport);

module.exports = router;