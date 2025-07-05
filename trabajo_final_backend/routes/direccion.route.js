const express = require('express');
const direccionCtrl = require('../controllers/direccion.controller.js');
const router = express.Router();

// Rutas para Direccion
router.post('/', direccionCtrl.createDireccion);
router.get('/', direccionCtrl.getDirecciones);
router.get('/:id', direccionCtrl.getDireccionById);
router.put('/:id', direccionCtrl.updateDireccion);
router.delete('/:id', direccionCtrl.deleteDireccion);

module.exports = router;
