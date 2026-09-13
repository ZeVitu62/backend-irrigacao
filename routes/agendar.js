const express = require('express');
const router = express.Router();
const cron = require('node-cron');
const irrigacaoController = require('../controllers/irrigacaoController');

// Lista de tarefas agendadas em memória
let tarefas = [];

// Criar novo agendamento
router.post('/', (req, res) => {
  const { hora, acionar } = req.body;

  if (!hora || typeof acionar !== 'boolean') {
    return res.status(400).json({ erro: "Informe 'hora' (HH:mm) e 'acionar' (true/false)" });
  }

  // Converter hora para formato cron (minuto e hora)
  const [hh, mm] = hora.split(':');
  const expressaoCron = `${mm} ${hh} * * *`;

  // Criar tarefa
  const tarefa = cron.schedule(expressaoCron, () => {
    console.log(`⏰ Executando irrigação às ${hora}`);
    irrigacaoController.acionarIrrigacao(
      { body: { acionar } },
      { json: (msg) => console.log(msg) }
    );
  });

  tarefas.push({ hora, acionar, tarefa });

  res.json({ mensagem: `Agendamento criado para ${hora}`, acionar });
});

// Listar agendamentos ativos
router.get('/', (req, res) => {
  res.json(tarefas.map(t => ({ hora: t.hora, acionar: t.acionar })));
});

// Executar irrigação imediatamente (teste)
router.post('/teste', (req, res) => {
  irrigacaoController.acionarIrrigacao(req, res);
});

module.exports = router;


