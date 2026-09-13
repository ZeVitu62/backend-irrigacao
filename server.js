const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const sensoresRoutes = require('./routes/sensores');
const irrigacaoRoutes = require('./routes/irrigacao');
const relatorioRoutes = require('./routes/relatorio');

app.use('/sensores', sensoresRoutes);
app.use('/irrigacao', irrigacaoRoutes);
app.use('/relatorio', relatorioRoutes);

require('./services/agendamento');

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

const agendarRoutes = require('./routes/agendar');
app.use('/agendar', agendarRoutes);
