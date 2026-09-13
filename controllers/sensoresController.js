let sensores = {
  umidadeSolo: 40,
  temperatura: 28,
  nivelAgua: 70
};

let historico = [];

exports.getSensores = (req, res) => {
  res.json(sensores);
};

exports.updateSensores = (req, res) => {
  sensores = req.body;
  historico.push(sensores);
  if (historico.length > 5) historico.shift();
  res.json({ mensagem: "Dados atualizados!", sensores });
};

exports.getHistorico = (req, res) => {
  res.json(historico);
};

exports.getSensoresData = () => sensores;
