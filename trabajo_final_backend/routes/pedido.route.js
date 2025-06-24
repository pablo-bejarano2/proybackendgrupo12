const express = require("express");
const pedidoCtrl = require("../controllers/pedido.controller");

const Router = express.Router();
Router.post("/", pedidoCtrl.createPedido);
Router.get("/", pedidoCtrl.getPedidos);
Router.get("/:id", pedidoCtrl.getPedidoById);
Router.put("/:id", pedidoCtrl.updatePedido);
Router.delete("/:id", pedidoCtrl.deletePedido);
module.exports = Router;