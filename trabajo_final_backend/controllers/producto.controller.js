const Producto = require("../models/producto");
const Categoria = require("../models/categoria");
const productoCtrl = {};

productoCtrl.createProducto = async (req, res) => {
  try {
    const producto = new Producto(req.body);
    await producto.save();
    res.status(201).json(
        { status: "OK",
          msg: "Producto guardado correctamente",
          producto: producto }
        );
  } catch (error) {
    res.status(400).json({ 
        status: "ERROR",
        msg: "Error procesando operación",
        causa: error.message // Valido para pruebas. 
        });
  }
};

productoCtrl.getProductos = async (req, res) => {
  try {
    const productos = await Producto.find().populate("categoria");
    res.json({
        status: "OK",
        msg: "Productos obtenidos correctamente",
        productos: productos
    });
  } catch (error) {
    res.status(500).json({
        status: "ERROR",
        msg: "Error procesando operación",
        causa: error.message // Valido para pruebas.
    });
  }
};

productoCtrl.getProductosByCategoria = async (req, res) => {
  try {
    const categoria = await Categoria.findOne({ nombre: req.params.categoriaNombre });
    if (!categoria) {
      return res.status(404).json({
        status: "ERROR",
        msg: "Categoría no encontrada",
      });
    }
    const productos = await Producto.find({ categoria: categoria._id }).populate("categoria");
    res.json({
      status: "OK",
      msg: "Productos obtenidos correctamente por categoría",
      productos: productos
    });
  } catch (error) {
    res.status(500).json({
      status: "ERROR",
      msg: "Error procesando operación",
      causa: error.message
    });
  }
};

productoCtrl.getProductoById = async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id).populate("categoria");
    if (!producto) 
        return res.status(404).json({
            status: "ERROR",
            msg: "Producto no encontrado",
        });
    res.json(producto);
  } catch (error) {
    res.status(500).json({
        status: "ERROR",
        msg: "Error procesando operación",
        causa: error.message // Valido para pruebas.
    });
  }
};

productoCtrl.getProductosByNombre = async (req, res) => {
  try {
    const productos = await Producto.find({ nombre: new RegExp(req.params.nombre, 'i') }).populate("categoria");
    if (productos.length === 0) {
      return res.status(404).json({
        status: "ERROR",
        msg: "No se encontraron productos",
      });
    }
    res.json({
      status: "OK",
      msg: "Productos obtenidos correctamente",
      productos: productos
    });
  } catch (error) {
    res.status(500).json({
      status: "ERROR",
      msg: "Error procesando operación",
      causa: error.message
    });
  }
};

productoCtrl.updateProducto = async (req, res) => {
  try {
    const producto = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!producto) 
        return res.status(404).json({
            status: "ERROR",
            msg: "Producto no encontrado",
        });
    res.json(producto);
  } catch (error) {
    res.status(400).json({
        status: "ERROR",
        msg: "Error procesando operación",
        causa: error.message // Valido para pruebas.
    });
  }
};

productoCtrl.deleteProducto = async (req, res) => {
  try {
    const producto = await Producto.findByIdAndDelete(req.params.id);
    if (!producto) 
        return res.status(404).json({
            status: "ERROR",
            msg: "Producto no encontrado",
        });
    res.json({ message: "Producto eliminado" });
  } catch (error) {
    res.status(500).json({ 
        status: "ERROR",
        msg: "Error procesando operación",
        causa: error.message // Valido para pruebas.
    });
  }
};

module.exports = productoCtrl;