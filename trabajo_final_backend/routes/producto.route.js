const express = require("express");
const productoCtrl = require("../controllers/producto.controller");

const router = express.Router();

router.post("/", productoCtrl.createProducto);
router.get("/", productoCtrl.getProductos);
router.get("/:id", productoCtrl.getProductoById);
router.get("/categoria/:categoriaId", productoCtrl.getProductosByCategoria); // <-- Agregado
router.put("/:id", productoCtrl.updateProducto);
router.delete("/:id", productoCtrl.deleteProducto);

module.exports = router;