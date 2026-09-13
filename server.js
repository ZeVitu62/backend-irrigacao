const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// suas rotas aqui
const sensoresRoutes = require('./routes/sensores');
const irrigacaoRoutes = require('./routes/irrigacao');
const relatorioRoutes = require('./routes/relatorio');
const agendarRoutes = require('./routes/agendar');

app.use('/sensores', sensoresRoutes);
app.use('/irrigacao', irrigacaoRoutes);
app.use('/relatorio', relatorioRoutes);
app.use('/agendar', agendarRoutes);

// inicia servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
const cron = require('node-cron');
const irrigacaoController = require('../controllers/irrigacaoController');
const sensoresController = require('../controllers/sensoresController');

// Regra automática: verificar sensores a cada minuto
cron.schedule('* * * * *', () => {
  console.log("🔍 Verificando regras inteligentes...");

  const sensores = sensoresController.getSensores();

  // Regra 1: irrigação automática
  if (sensores.umidadeSolo < 30) {
    console.log("💧 Solo seco! Ligando irrigação...");
    irrigacaoController.acionarIrrigacao(
      { body: { acionar: true } },
      { json: (msg) => console.log(msg) }
    );
  } else if (sensores.umidadeSolo > 60) {
    console.log("✅ Solo úmido! Desligando irrigação...");
    irrigacaoController.acionarIrrigacao(
      { body: { acionar: false } },
      { json: (msg) => console.log(msg) }
    );
  }require('./services/regras');


  // Regra 2: alerta de bebedouro
  if (sensores.nivelAgua < 20) {
    console.log("🚨 Alerta: nível de água baixo!");
  }
});
