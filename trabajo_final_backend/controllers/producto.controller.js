const Producto = require("../models/producto");
const Categoria = require("../models/categoria");
const productoCtrl = {};

productoCtrl.createProducto = async (req, res) => {
  try {
    // Obtén las URLs de las imágenes subidas
    const imagenes = req.files ? req.files.map(file => file.path) : [];

    // Recibe el nombre de la categoría en req.body.categoria
    let { nombre, descripcion, precio, color, categoria, tallas } = req.body;

    const productoExistente = await Producto.findOne({ nombre });
    if (productoExistente) {
      return res.status(400).json({
        status: "ERROR",
        msg: "Ya existe un producto con ese nombre",
      });
    }
    // Busca el ID de la categoría por nombre
    const categoriaDoc = await Categoria.findById(categoria);
        if (!categoriaDoc) {
      return res.status(400).json({
        status: "ERROR",
        msg: "Categoría no encontrada",
      });
    }
    const categoriaId = categoriaDoc._id;

    // Si tallas viene como string (por multipart/form-data), conviértelo a array
    if (typeof tallas === "string") {
      tallas = JSON.parse(tallas);
    }

    const producto = new Producto({
      nombre,
      descripcion,
      precio,
      color,
      imagenes,
      categoria: categoriaId,
      tallas
    });

    await producto.save();
    
    res.status(201).json({
      status: "OK",
      msg: "Producto guardado correctamente",
      producto: producto
    });
  } catch (error) {
    res.status(400).json({
      status: "ERROR",
      msg: "Error procesando operación",
      causa: error.message,
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
    const productos = await Producto.find({ nombre: new RegExp(req.query.nombre, 'i') }).populate("categoria");
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

// PUT /api/producto/:id
productoCtrl.updateProducto = async (req, res) => {
  try {
    let { nombre, descripcion, precio, color, categoria, tallas } = req.body;

    const productoExistente = await Producto.findOne({ nombre, _id: { $ne: req.params.id } });
    if (productoExistente) {
      return res.status(409).json({
        status: "ERROR",
        msg: "Ya existe un producto con ese nombre"
      });
    }
    // Buscar la categoría por nombre (case-insensitive)
    const categoriaDoc = await Categoria.findById(categoria);
    if (!categoriaDoc) {
      return res.status(400).json({ status: "ERROR", msg: "Categoría no encontrada" });
    }
    const categoriaId = categoriaDoc._id;

    if (typeof tallas === "string") {
      tallas = JSON.parse(tallas);
    }

    // Si se suben nuevas imágenes, reemplaza las anteriores
    const imagenes = req.files && req.files.length > 0
      ? req.files.map(file => file.path)
      : undefined; // Si no se suben, no modificar

    const updateData = {
      nombre,
      descripcion,
      precio,
      color,
      categoria: categoriaId,
      tallas
    };
    if (imagenes) updateData.imagenes = imagenes;

    const producto = await Producto.findByIdAndUpdate(req.params.id, updateData, { new: true }).populate("categoria");
    if (!producto) {
      return res.status(404).json({ status: "ERROR", msg: "Producto no encontrado" });
    }
    res.json({ status: "OK", msg: "Producto actualizado", producto });
  } catch (error) {
    res.status(400).json({
      status: "ERROR",
      msg: "Error procesando operación",
      causa: error.message,
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
