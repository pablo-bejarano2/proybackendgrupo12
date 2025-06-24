const express = require('express');
const cuponCtrl = require('../controllers/cupon.controller.js');
const router = express.Router();

router.post('/', cuponCtrl.createCupon); // Crear un nuevo cupón
router.get('/', cuponCtrl.getCupones); // Obtener todos los cupones
router.get('/:id', cuponCtrl.getCuponById); // Obtener cupón por ID
router.get('/codigo/:codigo', cuponCtrl.getCuponByCodigo); // Obtener cupón por código
router.put('/:id', cuponCtrl.updateCupon); // Actualizar cupón por ID
router.delete('/:id', cuponCtrl.deleteCupon); // Eliminar cupón por ID
router.post('/aplicar', cuponCtrl.applyCupon); // Aplicar cupón

module.exports = router;