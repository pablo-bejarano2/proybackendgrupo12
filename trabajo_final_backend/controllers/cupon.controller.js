const Cupon = require('../models/cupon.js');
const cuponCtrl = {};

cuponCtrl.createCupon = async (req, res) => {
    try {
        const cupon = new Cupon(req.body);
        await cupon.save();
        res.status(201).json({
            status: "OK",
            msg: "Cupón guardado correctamente",
            cupon: cupon
        });

    } catch (error) {
        res.status(400).json({
            status: "ERROR",
            msg: "Error procesando operación",
            causa: error.message // Valido para pruebas.
        });
    }
};

cuponCtrl.getCuponById = async (req, res) => {
    try {
        const cupon = await Cupon.findById(req.params.id);
        if (!cupon) {
            return res.status(404).json({
                status: "ERROR",
                msg: "Cupón no encontrado"
            });
        }
        res.status(200).json({
            status: "OK",
            cupon: cupon
        });
    } catch (error) {
        res.status(400).json({
            status: "ERROR",
            msg: "Error procesando operación",
            causa: error.message // Valido para pruebas.
        });
    }
};

// GET: obtener cupon por codigo
cuponCtrl.getCuponByCodigo = async (req, res) => {
    try {
        const cupon = await Cupon.findOne({ codigo: req.params.codigo });
        if (!cupon) {
            return res.status(404).json({
                status: "ERROR",
                msg: "Cupón no encontrado"
            });
        }
        res.status(200).json({
            status: "OK",
            cupon: cupon
        });
    } catch (error) {
        res.status(400).json({
            status: "ERROR",
            msg: "Error procesando operación",
            causa: error.message // Valido para pruebas.
        });
    }
};

// get: obtener todos los cupones
cuponCtrl.getCupones = async (req, res) => {
    try {
        const cupones = await Cupon.find();
        res.status(200).json({
            status: "OK",
            cupones: cupones
        });
    } catch (error) {
        res.status(500).json({
            status: "ERROR",
            msg: "Error procesando operación",
            causa: error.message // Valido para pruebas.
        });
    }
};

// PUT: actualizar cupon
cuponCtrl.updateCupon = async (req, res) => {
    try {
        const cupon = await Cupon.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!cupon) {
            return res.status(404).json({
                status: "ERROR",
                msg: "Cupón no encontrado"
            });
        }
        res.status(200).json({
            status: "OK",
            msg: "Cupón actualizado correctamente",
            cupon: cupon
        });
    } catch (error) {
        res.status(400).json({
            status: "ERROR",
            msg: "Error procesando operación",
            causa: error.message // Valido para pruebas.
        });
    }
};

// DELETE: eliminar cupon
cuponCtrl.deleteCupon = async (req, res) => {
    try {
        const cupon = await Cupon.findByIdAndDelete(req.params.id);
        if (!cupon) {
            return res.status(404).json({
                status: "ERROR",
                msg: "Cupón no encontrado"
            });
        }
        res.status(200).json({
            status: "OK",
            msg: "Cupón eliminado correctamente"
        });
    } catch (error) {
        res.status(400).json({
            status: "ERROR",
            msg: "Error procesando operación",
            causa: error.message // Valido para pruebas.
        });
    }
};

//aplicar cupon (validación, expiración y estado)
cuponCtrl.applyCupon = async (req, res) => {
    try {
        const cupon = await Cupon.findOne({ codigo: req.body.codigo });
        if (!cupon){
            return res.status(404).json({
                status: "ERROR",
                msg: "Cupón no encontrado"
            });
        }
        if (!cupon.activo) {
            return res.status(400).json({
                status: "ERROR",
                msg: "Cupón no está activo"
            });
        }

        if(new Date() > cupon.fechaExpiracion) {
            return res.status(400).json({
                status: "ERROR",
                msg: "Cupón ha expirado"
            });
        }
        res.status(200).json({
            status: "OK",
            msg: "Cupón aplicado correctamente",
            descuento: cupon.descuento
        });

    }catch(error){
        res.status(400).json({
            status: "ERROR",
            msg: "Error procesando operación",
            causa: error.message // Valido para pruebas.
        });
    }
};

module.exports = cuponCtrl;