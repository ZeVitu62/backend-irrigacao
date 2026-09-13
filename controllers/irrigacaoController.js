exports.acionarIrrigacao = (req, res) => {
  const { acionar } = req.body;
  if (acionar) {
    res.json({ mensagem: "Irrigação ligada 🚜💧" });
  } else {
    res.json({ mensagem: "Irrigação desligada 🚫💧" });
  }
};
