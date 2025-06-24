const express = require("express");
const itemPedidoCtrl = require("../controllers/itemPedido.controller");

const Router = express.Router();
Router.post("/", itemPedidoCtrl.createItemPedido);
Router.get("/", itemPedidoCtrl.getItemsPedido);
Router.get("/:id", itemPedidoCtrl.getItemsPedidoById);
Router.put("/:id", itemPedidoCtrl.updateItemPedido);
Router.delete("/:id", itemPedidoCtrl.deleteItemPedido);

module.exports = Router;
