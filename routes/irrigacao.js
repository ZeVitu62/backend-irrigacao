const express = require('express');
const router = express.Router();
const irrigacaoController = require('../controllers/irrigacaoController');

router.post('/', irrigacaoController.acionarIrrigacao);

module.exports = router;
