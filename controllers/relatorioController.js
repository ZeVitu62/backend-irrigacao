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
