const express = require('express');
const dashboardCtrl = require('../controllers/dashboard.controller');
const router = express.Router();

router.get('/usuariosPorDia', dashboardCtrl.usuariosPorDia);
router.get('/pedidosPorDia', dashboardCtrl.pedidosPorDia);
router.get('/dineroPorPedido', dashboardCtrl.dineroPorPedido);
router.get('/cuponesUsados', dashboardCtrl.cuponesUsados);

module.exports = router;