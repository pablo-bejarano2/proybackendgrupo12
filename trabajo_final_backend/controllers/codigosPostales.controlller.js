const fs = require('fs');
const path = require('path');

const codigos = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../codigos_postales.json'), 'utf8')
);

const buscarPorCP = (req, res) => {
  const cp = req.params.cp;
  const resultados = codigos.filter(item => item.cp === cp);

  if (resultados.length === 0) {
    return res.status(404).json({ error: 'Código postal no encontrado' });
  }

  res.json(resultados);
};

module.exports = { buscarPorCP };
