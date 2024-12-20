const express = require('express');
const router = express.Router();
const WordController = require('../controllers/WordController');

router.post('/generate', WordController.exportToWord);

router.post('generate_dismissal', WordController.exportToWordDismiss);

router.post('/generate_vacation', WordController.exportToWordVacation);

module.exports = router;