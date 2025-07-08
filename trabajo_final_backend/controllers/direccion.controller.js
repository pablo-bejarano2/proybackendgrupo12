const Direccion = require('../models/direccion.js');
const direccionCtrl = {};

// Crear direccion
direccionCtrl.createDireccion = async (req, res) => {
    try {
        const direccion = new Direccion(req.body);
        await direccion.save();
        res.status(201).json({
            status: "OK",
            msg: "Dirección guardada correctamente",
            direccion: direccion
        });
    } catch (error) {
        res.status(400).json({
            status: "ERROR",
            msg: "Error procesando operación",
            causa: error.message // Valido para pruebas. 
        });
    }
};

// Obtener direccion por id
direccionCtrl.getDireccionById = async (req, res) => {
    try {
        const direccion = await Direccion.findById(req.params.id);
        if (!direccion) {
            return res.status(404).json({
                status: "ERROR",
                msg: "Dirección no encontrada"
            });
        }
        res.status(200).json({
            status: "OK",
            direccion: direccion
        });
    } catch (error) {
        res.status(400).json({
            status: "ERROR",
            msg: "Error procesando operación",
            causa: error.message // Valido para pruebas. 
        });
    }
};

//Obtener todas las direcciones
direccionCtrl.getDirecciones = async (req, res) => {
    try {
        const direcciones = await Direccion.find();
        res.status(200).json({
            status: "OK",
            direcciones: direcciones
        });
    } catch (error) {
        res.status(500).json({
            status: "ERROR",
            msg: "Error procesando operación",
            causa: error.message // Valido para pruebas.
        });
    }
};

// Actualizar direccion
direccionCtrl.updateDireccion = async (req, res) => {
    try {
        const direccion = await Direccion.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!direccion) {
            return res.status(404).json({
                status: "ERROR",
                msg: "Dirección no encontrada"
            });
        }
        res.status(200).json({
            status: "OK",
            msg: "Dirección actualizada correctamente",
            direccion: direccion
        });
    } catch (error) {
        res.status(400).json({
            status: "ERROR",
            msg: "Error procesando operación",
            causa: error.message // Valido para pruebas.
        });
    }
};

//Eliminar direccion
direccionCtrl.deleteDireccion = async (req, res) => {
    try {
        const direccion = await Direccion.findByIdAndDelete(req.params.id);
        if (!direccion) {
            return res.status(404).json({
                status: "ERROR",
                msg: "Dirección no encontrada"
            });
        }
        res.status(200).json({
            status: "OK",
            msg: "Dirección eliminada correctamente"
        });
    } catch (error) {
        res.status(500).json({
            status: "ERROR",
            msg: "Error procesando operación",
            causa: error.message // Valido para pruebas.
        });
    }
};

module.exports = direccionCtrl;
