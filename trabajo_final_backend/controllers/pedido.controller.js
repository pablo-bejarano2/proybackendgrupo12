const Pedido = require('../models/pedido.js');

const PedidoController = {};

PedidoController.createPedido = async (req, res) => {
    try {
        const { items } = req.body;
        total = 0;
        const cupon = req.body.cupon || null;

        if (!items || items.length === 0) {
            return res.status(400).json({
                status: 'ERROR',
                msg: 'El pedido debe contener al menos un item'
            });
        }
        const itemsDocs = await Pedido.model('ItemPedido').find({ _id: { $in: items } });
        if (itemsDocs.length !== items.length) {
            return res.status(400).json({
                status: 'ERROR',
                msg: 'Uno o más items no existen'
            });
        }
        for (const item of itemsDocs) {
            total += item.subtotal || 0;
        } 
        
        if(cupon) {
            cuponDoc = await Pedido.model('Cupon').findById(cupon);
            const descuento = cuponDoc.descuento || 0;
            total -= descuento;
        }
        const pedido = new Pedido({
            ...req.body,
            total: total || 0,
            estado: 'pendiente'
        });

        await pedido.save();
        res.status(201).json({
            status: 'OK',
            msg: 'Pedido creado correctamente',
            pedido
        });
    } catch (error) {
        res.status(500).json({
            status: 'ERROR',
            msg: 'Error procesando operación',
            causa: error.message
        });
    }
}

PedidoController.getPedidos = async (req, res) => {
    try {
        const pedidos = await Pedido.find().populate('items').populate('direccion').populate('cupon');
        res.json({
            status: 'OK',
            msg: 'Pedidos obtenidos correctamente',
            pedidos
        });
    } catch (error) {
        res.status(500).json({
            status: 'ERROR',
            msg: 'Error procesando operación',
            causa: error.message
        });
    }
}

PedidoController.getPedidoById = async (req, res) => {
    try {
        const pedido = await Pedido.findById(req.params.id).populate('items').populate('direccion').populate('cupon');
        if (!pedido) {
            return res.status(404).json({
                status: 'ERROR',
                msg: 'Pedido no encontrado'
            });
        }
        res.json({
            status: 'OK',
            msg: 'Pedido obtenido correctamente',
            pedido
        });
    } catch (error) {
        res.status(500).json({
            status: 'ERROR',
            msg: 'Error procesando operación',
            causa: error.message
        });
    }
}

PedidoController.updatePedido = async (req, res) => {
    try {
        const { items, cupon } = req.body;
        let total = 0;

        const itemsDocs = await Pedido.model('ItemPedido').find({ _id: { $in: items } });
        if (itemsDocs.length !== items.length) {
            return res.status(400).json({
                status: 'ERROR',
                msg: 'Uno o más items no existen'
            });
        }
        if(items && items.length > 0) {
            for (const item of itemsDocs) {
                total += item.subtotal || 0;
            }
        }
        if(cupon) {
            cuponDoc = await Pedido.model('Cupon').findById(cupon);
            const descuento = cuponDoc.descuento || 0;
            total -= descuento;
        }

        const pedido = await Pedido.findByIdAndUpdate(
            req.params.id,
            { ...req.body, total},
            { new: true });
        if (!pedido) {
            return res.status(404).json({
                status: 'ERROR',
                msg: 'Pedido no encontrado'
            });
        }
        res.json({
            status: 'OK',
            msg: 'Pedido actualizado correctamente',
            pedido
        });
    } catch (error) {
        res.status(500).json({
            status: 'ERROR',
            msg: 'Error procesando operación',
            causa: error.message
        });
    }
}   

PedidoController.deletePedido = async (req, res) => {
    try {

        const pedido = await Pedido.findByIdAndDelete(req.params.id);
        if (!pedido) {
            return res.status(404).json({
                status: 'ERROR',
                msg: 'Pedido no encontrado'
            });
        }
        res.json({
            status: 'OK',
            msg: 'Pedido eliminado correctamente'
        });
    } catch (error) {
        res.status(500).json({
            status: 'ERROR',
            msg: 'Error procesando operación',
            causa: error.message
        });
    }
}

module.exports = PedidoController;