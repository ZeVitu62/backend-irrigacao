const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// --- Simulação de sensores ---
let sensores = {
  umidadeSolo: 30,
  temperatura: 28,
  nivelAgua: 70
};

// Rota para ver sensores
app.get('/sensores', (req, res) => {
  res.json(sensores);
});

// Rota para atualizar sensores
app.post('/sensores', (req, res) => {
  sensores = req.body;
  res.json({ mensagem: "Dados atualizados!", sensores });
});

// --- Irrigação ---
app.post('/irrigacao', (req, res) => {
  const { acionar } = req.body;
  if (acionar) {
    res.json({ mensagem: "Irrigação ligada 🚜💧" });
  } else {
    res.json({ mensagem: "Irrigação desligada 🚫💧" });
  }
});

// --- Relatório ---
app.get('/relatorio', (req, res) => {
  let alerta = "";
  if (sensores.umidadeSolo < 30) {
    alerta = "⚠️ Solo muito seco, precisa irrigar!";
  }
  res.json({ sensores, alerta });
});

// --- Bebedouro ---
app.get('/bebedouro', (req, res) => {
  let alerta = "";
  if (sensores.nivelAgua < 20) {
    alerta = "🐄 Bebedouro quase vazio, reabastecer!";
  }
  res.json({ nivelAgua: sensores.nivelAgua, alerta });
});

// --- Histórico simples ---
let historico = [];
app.post('/sensores', (req, res) => {
  sensores = req.body;
  historico.push(sensores);
  if (historico.length > 5) historico.shift();
  res.json({ mensagem: "Dados atualizados!", sensores });
});
app.get('/historico', (req, res) => {
  res.json(historico);
});

// --- Ligar o servidor ---
app.listen(port, () => {
  console.log(`Servidor rodando na fazenda em http://localhost:${port}`);
});
let sensores = {
  umidadeSolo: 40,
  temperatura: 28,
  nivelAgua: 70
};

exports.getSensores = (req, res) => {
  res.json(sensores);
};

exports.updateSensores = (req, res) => {
  sensores = req.body;
  res.json({ mensagem: "Dados atualizados!", sensores });
};

exports.acionarIrrigacao = (req, res) => {
  const { acionar } = req.body;
  if (acionar) {
    res.json({ mensagem: "Irrigação ligada 🚜💧" });
  } else {
    res.json({ mensagem: "Irrigação desligada 🚫💧" });
  }
};
const sensoresController = require('./sensoresController');

exports.getRelatorio = (req, res) => {
  const sensores = sensoresController.getSensoresData();
  let alerta = "";
  if (sensores.umidadeSolo < 30) {
    alerta = "⚠️ Solo muito seco, precisa irrigar!";
  }
  if (sensores.nivelAgua < 20) {
    alerta = "🐄 Bebedouro quase vazio, reabastecer!";
  }
  res.json({ sensores, alerta });
};

// Função auxiliar para acessar dados dos sensores
exports.getSensoresData = () => {
  return {
    umidadeSolo: 40,
    temperatura: 28,
    nivelAgua: 70
  };
};
const express = require('express');
const router = express.Router();
const sensoresController = require('../controllers/sensoresController');

router.get('/', sensoresController.getSensores);
router.post('/', sensoresController.updateSensores);

module.exports = router;
const express = require('express');
const router = express.Router();
const irrigacaoController = require('../controllers/irrigacaoController');

router.post('/', irrigacaoController.acionarIrrigacao);

module.exports = router;
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Importa as rotas
const sensoresRoutes = require('./routes/sensores');
const irrigacaoRoutes = require('./routes/irrigacao');
const relatorioRoutes = require('./routes/relatorio');

// Usa as rotas
app.use('/sensores', sensoresRoutes);
app.use('/irrigacao', irrigacaoRoutes);
app.use('/relatorio', relatorioRoutes);

// Liga o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na fazenda em http://localhost:${port}`);
});
