const ItemPedido = require("../models/itemPedido");
const Producto = require("../models/producto");
const itemPedidoCtrl = {};

itemPedidoCtrl.createItemPedido = async (req, res) => {
    try{
        const producto = await Producto.findById(req.body.producto);
         if (!producto) {
            return res.status(400).json({
                status: "ERROR",
                msg: "Producto no encontrado"
            });
        }
        const cantidad = req.body.cantidad || 1;
        const subtotal = cantidad * producto.precio;

        const itemPedido = new ItemPedido({
            ...req.body,
             subtotal: subtotal});
        await itemPedido.save();
        res.status(201).json({ 
            status: "OK",
            msg: "Item de pedido guardado correctamente",
            itemPedido: itemPedido
        });
    } catch (error) {
        res.status(400).json({
            status: "ERROR",
            msg: "Error procesando operación",
            causa: error.message
        });
    }
}

itemPedidoCtrl.getItemsPedido = async (req, res) => {
    try {
        const itemsPedido = await ItemPedido.find().populate("producto");
        res.json({
            status: "OK",
            msg: "Items de pedido obtenidos correctamente",
            itemsPedido: itemsPedido
        });
    } catch (error) {
        res.status(500).json({
            status: "ERROR",
            msg: "Error procesando operación",
            causa: error.message
        });
    }
};

itemPedidoCtrl.getItemsPedidoById = async (req, res) => {
    try {
        const itemPedido = await ItemPedido.findById(req.params.id).populate("producto");
        if (!itemPedido) {
            return res.status(404).json({
                status: "ERROR",
                msg: "Item de pedido no encontrado"
            });
        }
        res.json({
            status: "OK",
            msg: "Item de pedido obtenido correctamente",
            itemPedido: itemPedido
        });
    } catch (error) {
        res.status(500).json({
            status: "ERROR",
            msg: "Error procesando operación",
            causa: error.message
        });
    }
}

itemPedidoCtrl.updateItemPedido = async (req, res) => {
    try {
        const producto = await Producto.findById(req.body.producto);
        if (!producto) {
            return res.status(400).json({
                status: "ERROR",
                msg: "Producto no encontrado"
            });
        }
        const cantidad = req.body.cantidad || 1;
        const subtotal = cantidad * producto.precio;


        const itemPedido = await ItemPedido.findByIdAndUpdate(
            req.params.id,
            { ...req.body, subtotal: subtotal },
            { new: true }).populate("producto");
        if (!itemPedido) {  
            return res.status(404).json({
                status: "ERROR",
                msg: "Item de pedido no encontrado"
            });
        }
        res.json({
            status: "OK",
            msg: "Item de pedido actualizado correctamente",
            itemPedido: itemPedido
        }); 
    }catch (error) {
        res.status(400).json({
            status: "ERROR",
            msg: "Error procesando operación",
            causa: error.message
        });
    }
}

itemPedidoCtrl.deleteItemPedido = async (req, res) => {
    try {
        const itemPedido = await ItemPedido.findByIdAndDelete(req.params.id);
        if (!itemPedido) {
            return res.status(404).json({
                status: "ERROR",
                msg: "Item de pedido no encontrado"
            });
        }
        res.json({
            status: "OK",
            msg: "Item de pedido eliminado correctamente"
        });
    } catch (error) {
        res.status(500).json({
            status: "ERROR",
            msg: "Error procesando operación",
            causa: error.message
        });
    }
}

module.exports = itemPedidoCtrl;