const express = require('express');
const dashboardCtrl = require('../controllers/dashboard.controller');
const router = express.Router();

// Usuarios registrados por día (últimos 7 días)
router.get('/usuariosPorDia',
  /*
    #swagger.path = '/api/dashboard/usuariosPorDia'
    #swagger.tags = ['Dashboard']
    #swagger.summary = 'Usuarios registrados por día'
    #swagger.description = 'Devuelve un array con la cantidad de usuarios registrados por día en los últimos 7 días. El array tiene 7 elementos, uno por cada día.'
    #swagger.produces = ['application/json']
    #swagger.responses[200] = {
      description: 'Array de usuarios por día',
      schema: [0, 2, 1, 0, 3, 1, 4]
    }
    #swagger.responses[500] = {
      description: 'Error interno del servidor',
      schema: { message: 'Error al obtener usuarios por día' }
    }
  */
  dashboardCtrl.usuariosPorDia
);

// Pedidos realizados por día (últimos 7 días)
router.get('/pedidosPorDia',
  /*
    #swagger.path = '/api/dashboard/pedidosPorDia'
    #swagger.tags = ['Dashboard']
    #swagger.summary = 'Pedidos realizados por día'
    #swagger.description = 'Devuelve un array con la cantidad de pedidos realizados por día en los últimos 7 días. El array tiene 7 elementos, uno por cada día.'
    #swagger.produces = ['application/json']
    #swagger.responses[200] = {
      description: 'Array de pedidos por día',
      schema: [1, 0, 2, 3, 1, 0, 5]
    }
    #swagger.responses[500] = {
      description: 'Error interno del servidor',
      schema: { message: 'Error al obtener pedidos por día' }
    }
  */
  dashboardCtrl.pedidosPorDia
);

// Monto de los últimos 4 pedidos
router.get('/dineroPorPedido',
  /*
    #swagger.path = '/api/dashboard/dineroPorPedido'
    #swagger.tags = ['Dashboard']
    #swagger.summary = 'Monto de los últimos 4 pedidos'
    #swagger.description = 'Devuelve un array con los montos de los últimos 4 pedidos realizados, ordenados del más antiguo al más reciente.'
    #swagger.produces = ['application/json']
    #swagger.responses[200] = {
      description: 'Array de montos de los últimos 4 pedidos',
      schema: [1200, 800, 1500, 950]
    }
    #swagger.responses[500] = {
      description: 'Error interno del servidor',
      schema: { message: 'Error al obtener montos de pedidos' }
    }
  */
  dashboardCtrl.dineroPorPedido
);

// Cupones usados (para gráfico)
router.get('/cuponesUsados',
  /*
    #swagger.path = '/api/dashboard/cuponesUsados'
    #swagger.tags = ['Dashboard']
    #swagger.summary = 'Cupones usados'
    #swagger.description = 'Devuelve un objeto con dos arrays: labels (nombres de cupones) y data (cantidad de veces usado cada cupón). Útil para gráficos.'
    #swagger.produces = ['application/json']
    #swagger.responses[200] = {
      description: 'Datos de cupones usados',
      schema: {
        labels: ['Descuento 10%', 'Descuento 20%'],
        data: [5, 2]
      }
    }
    #swagger.responses[500] = {
      description: 'Error interno del servidor',
      schema: { message: 'Error al obtener datos de cupones usados' }
    }
  */
  dashboardCtrl.cuponesUsados
);

module.exports = router;