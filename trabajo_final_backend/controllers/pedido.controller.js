const Pedido = require('../models/pedido.js');

const PedidoController = {};

//Crea un nuevo pedido
PedidoController.createPedido = async (req, res) => {
    try {
        const { items, cliente } = req.body;
        //Requiere email si no existe el cliente
        if(!cliente && !req.body.emailCliente) {
            return res.status(400).json({ 
                status: 'ERROR',
                msg: 'El cliente o el email del cliente es obligatorio'
            });
        }
        let emailD = null;
        //Utiliza los datos del cliente si existe.
        if(cliente) {
            const clienteObj = await Pedido.model('Usuario').findById(cliente);
            if (!clienteObj) {
                return res.status(400).json({
                    status: 'ERROR',
                    msg: 'Cliente no encontrado'
                });
            }
            emailD = clienteObj.email;
        }else {
            emailD = req.body.emailCliente 
        }
        total = 0;
        const cupon = req.body.cupon || null;
        //Requiere que los items existan
        if (!items || items.length === 0) {
            return res.status(400).json({
                status: 'ERROR',
                msg: 'El pedido debe contener al menos un item'
            });
        }
        //Controla que los items dados existan en la base de datos
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
        //Comprueba si el cupón existe y aplica el descuento
        if(cupon) {
            cuponDoc = await Pedido.model('Cupon').findById(cupon);
            if (!cuponDoc) {
                return res.status(400).json({
                    status: 'ERROR',
                    msg: 'Cupón no encontrado'
                });
            }
            const descuento = cuponDoc.descuento || 0;
            total -= (total*descuento)/100;
        }
        //Crea el pedido
        const pedido = new Pedido({
            ...req.body,
            total: total || 0,
            estado: 'pendiente',
            emailCliente: emailD
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
//Obtiene todos los pedidos
PedidoController.getPedidos = async (req, res) => {
    try {
        const pedidos = await Pedido.find()
        .populate({path: 'items', populate: {path: 'producto', select: 'nombre'}})
        .populate('direccion')
        .populate('cupon')
        .populate('cliente');
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
//Obtiene un pedido por su ID
PedidoController.getPedidoById = async (req, res) => {
    try {
        const pedido = await Pedido.findById(req.params.id)
        .populate({path: 'items', populate: {path: 'producto', select: 'nombre'}})
        .populate('direccion')
        .populate('cupon')
        .populate('cliente');
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
//Obtiene los pedidos de un usuario por su ID
PedidoController.getPedidoByUsserId = async (req, res) => {
    try {
        const { id } = req.params;
        const pedidos = await Pedido.find({ cliente: id })
            .populate({ path: 'items', populate: { path: 'producto', select: 'nombre' } })
            .populate('direccion')
            .populate('cupon')
            .populate('cliente');
        if (!pedidos || pedidos.length === 0) {
            return res.status(404).json({
                status: 'ERROR',
                msg: 'No se encontraron pedidos para este usuario'
            });
        }
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
//Actualiza un pedido por su ID
PedidoController.updatePedido = async (req, res) => {
    try {
        const { items, cupon } = req.body;
        let total = 0;
        let updateData = {};

        //control de items
        if (!items || items.length === 0) {
            return res.status(400).json({
                status: 'ERROR',
                msg: 'El pedido debe contener al menos un item'
            });
        }
        //Controla que los items dados existan.
        for (const itemFront of items) {
            const itemDoc = await Pedido.model('ItemPedido').findById(itemFront._id);
            if (!itemDoc) continue;
            const producto = await Pedido.model('Producto').findById(itemDoc.producto);
            if (!producto) continue;
            const cantidad = itemFront.cantidad;
            const subtotal = cantidad * producto.precio;
            await Pedido.model('ItemPedido').findByIdAndUpdate(
                itemFront._id,
                { cantidad, subtotal }
            );
        }
        //
        const itemsDocs = await Pedido.model('ItemPedido').find({ _id: { $in: items.map(i=>i._id) } });
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
        //control de cupon
        let cuponDoc = null;
        let cuponId = undefined;
        if(cupon && cupon.codigo && cupon.codigo.trim() !== '') {
            cuponDoc = await Pedido.model('Cupon').findOne({codigo : cupon.codigo.trim()});
            if (cuponDoc) {
                const descuento = cuponDoc.descuento || 0;
                total -= (total*descuento)/100;
                cuponId = cuponDoc._id;
            }else{
                cuponId = null;
            }
            
        }else{
            cuponId=null;
        }

        //actualizacion
        if (req.body.estado && ["pendiente", "enviado", "entregado", "cancelado"].includes(req.body.estado)) {
            updateData.estado = req.body.estado;
        }
        
        updateData = { ...req.body, ...updateData, total, items, cupon : cuponId };
        
        const pedido = await Pedido.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }).populate({path: 'items', populate: {path: 'producto', select: 'nombre'}}).populate('direccion').populate('cupon').populate('cliente');
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
//Elimina un pedido por su ID
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