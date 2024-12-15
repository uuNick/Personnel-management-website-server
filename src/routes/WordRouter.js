const express = require('express');
const router = express.Router();
const WordController = require('../controllers/WordController');

router.post('/generate', WordController.exportToWord);

module.exports = router;