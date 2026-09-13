const express = require('express');
const router = express.Router();
const irrigacaoController = require('../controllers/irrigacaoController');

// rota para criar agendamento (futuro)
router.post('/', (req, res) => {
  const { hora, acionar } = req.body;
  // aqui você poderia salvar em memória ou apenas logar
  res.json({ mensagem: `Agendamento criado para ${hora}`, acionar });
});

// rota de teste para executar imediatamente
router.post('/teste', (req, res) => {
  irrigacaoController.acionarIrrigacao(req, res);
});


