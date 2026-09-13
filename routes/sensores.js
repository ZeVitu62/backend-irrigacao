const express = require('express');
const router = express.Router();
const sensoresController = require('../controllers/sensoresController');

router.get('/', sensoresController.getSensores);
router.post('/', sensoresController.updateSensores);
router.get('/historico', sensoresController.getHistorico);

module.exports = router;
