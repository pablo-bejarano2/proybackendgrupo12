const express = require("express");
const productoCtrl = require("../controllers/producto.controller.js");
const upload = require("../config/multer");

const router = express.Router();

router.post("/upload", upload.array("imagenes", 5), (req, res) => {
  const urls = req.files.map(file => file.path);
  res.json({ urls });
});

// Crear producto con imágenes y datos en una sola petición
router.post("/", upload.array("imagenes", 5), productoCtrl.createProducto);
// Actualizar producto con imágenes y datos en una sola petición
router.put("/:id", upload.array("imagenes", 5), productoCtrl.updateProducto);
router.get("/", productoCtrl.getProductos);
router.get("/categoria/:categoriaNombre", productoCtrl.getProductosByCategoria);
router.get("/nombre", productoCtrl.getProductosByNombre);
router.get("/:id", productoCtrl.getProductoById);
router.delete("/:id", productoCtrl.deleteProducto);

module.exports = router;