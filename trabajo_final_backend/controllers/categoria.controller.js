const Categoria = require("../models/categoria");

const categoriaCtrl = {};

categoriaCtrl.createCategoria = async (req, res) => {
  var categoria = new Categoria(req.body);
  try {
    await categoria.save();
    res.status(200).json({
      status: "OK",
      msg: "Categoria guardada correctamente",
    });
  } catch (error) {
    res.status(400).json({
      status: "ERROR",
      msg: "Error procesando operación",
      causa: error.message, //solo para pruebas
    });
  }
};

categoriaCtrl.getCategorias = async (req, res) => {
  var categorias = await Categoria.find();
  res.status(200).json(categorias);
};

module.exports = categoriaCtrl;
