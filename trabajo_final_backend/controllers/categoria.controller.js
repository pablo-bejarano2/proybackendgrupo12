const Categoria = require("../models/categoria");

const categoriaCtrl = {};


async function existeCategoria (nombre,descripcion){
  return await Categoria.findOne({
    $or: [
      {nombre: nombre},
      {descripcion: descripcion}
    ]
  });
}
categoriaCtrl.createCategoria = async (req, res) => {
  try {
    const {nombre,descripcion} = req.body;
    const categoriaExistente = await existeCategoria(nombre, descripcion);
     if (categoriaExistente) {
      return res.status(409).json({
        status: "ERROR",
        msg: "Ya existe una categoría con el mismo nombre o descripción"
      });
    }
    const categoria = new Categoria(req.body);
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
  try {
    const categorias = await Categoria.find();
    if (categorias.length === 0) {
      return res.status(404).json({
        status: "ERROR",
        msg: "No se encontraron categorias",
      });
    }
    res.status(200).json({
      status: "OK",
      categorias: categorias
    });
  } catch (error) {
    res.status(500).json({
      status: "ERROR",
      msg: "Error procesando operación",
      causa: error.message // Valido para pruebas.
    });
  }
};

categoriaCtrl.eliminarCategoria = async (req, res) => {
  try {
    const categoria = await Categoria.findByIdAndDelete(req.params.id);
    if (!categoria) {
      return res.status(404).json({
        status: "ERROR",
        msg: "categoria no encontrada"
      });
    }
    res.status(200).json({
      status: "OK",
      msg: "Categoría eliminado correctamente"
    });
  } catch (error) {
    res.status(400).json({
      status: "ERROR",
      msg: "Error procesando operación",
      causa: error.message // Valido para pruebas.
    });
  }
}




module.exports = categoriaCtrl;
