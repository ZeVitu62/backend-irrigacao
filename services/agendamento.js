const cron = require('node-cron');
const irrigacaoController = require('../controllers/irrigacaoController');

// Exemplo: ligar irrigação todo dia às 18h
cron.schedule('0 18 * * *', () => {
  console.log("⏰ Hora de irrigar automaticamente!");
  // Aqui você pode chamar a lógica de irrigação
  irrigacaoController.acionarIrrigacao({ body: { acionar: true } }, {
    json: (msg) => console.log(msg)
  });
});
const cron = require('node-cron');
const irrigacaoController = require('../controllers/irrigacaoController');

// Exemplo: ligar irrigação todo dia às 18h
cron.schedule('0 18 * * *', () => {
  console.log("⏰ Hora de irrigar automaticamente!");
  irrigacaoController.acionarIrrigacao(
    { body: { acionar: true } },
    { json: (msg) => console.log(msg) }
  );
});
