const express = require("express");
const pedidoCtrl = require("../controllers/pedido.controller");

const Router = express.Router();


// Crear un nuevo pedido
Router.post("/",
  /*
    #swagger.path = '/api/pedido'
    #swagger.tags = ['Pedidos']
    #swagger.summary = 'Crear un nuevo pedido'
    #swagger.description = 'Permite crear un nuevo pedido. El cliente puede ser referenciado por ID o email. El total y el estado se calculan automáticamente.'
    #swagger.consumes = ['application/json']
    #swagger.produces = ['application/json']
    #swagger.parameters['pedido'] = {
      in: 'body',
      required: true,
      description: 'Datos del nuevo pedido',
      schema: {
        items: ['60c72b2f9b1e8c001c8e4d3c'],
        cliente: '60c72b2f9b1e8c001c8e4d3a',
        direccion: '60c72b2f9b1e8c001c8e4d3d',
        cupon: '60c72b2f9b1e8c001c8e4d3e',
        emailCliente: 'cliente@email.com'
      }
    }
    #swagger.responses[201] = {
      description: 'Pedido creado exitosamente',
      schema: {
        status: 'OK',
        msg: 'Pedido creado correctamente',
        pedido: {
          _id: '60c72b2f9b1e8c001c8e4d3f',
          items: ['60c72b2f9b1e8c001c8e4d3c'],
          cliente: '60c72b2f9b1e8c001c8e4d3a',
          direccion: '60c72b2f9b1e8c001c8e4d3d',
          cupon: '60c72b2f9b1e8c001c8e4d3e',
          total: 1500,
          estado: 'pendiente',
          emailCliente: 'cliente@email.com'
        }
      }
    }
    #swagger.responses[400] = {
      description: 'Error de validación o datos incorrectos',
      schema: {
        status: 'ERROR',
        msg: 'El cliente o el email del cliente es obligatorio'
      }
    }
    #swagger.responses[500] = {
      description: 'Error interno del servidor',
      schema: {
        status: 'ERROR',
        msg: 'Error procesando operación',
        causa: 'Descripción del error específico'
      }
    }
  */
  pedidoCtrl.createPedido
);

// Obtener todos los pedidos
Router.get("/",
  /*
    #swagger.path = '/api/pedido'
    #swagger.tags = ['Pedidos']
    #swagger.summary = 'Obtener todos los pedidos'
    #swagger.description = 'Devuelve una lista de todos los pedidos, incluyendo items, dirección, cupón y cliente.'
    #swagger.produces = ['application/json']
    #swagger.responses[200] = {
      description: 'Lista de pedidos obtenida exitosamente',
      schema: {
        status: 'OK',
        msg: 'Pedidos obtenidos correctamente',
        pedidos: [
          {
            _id: '60c72b2f9b1e8c001c8e4d3f',
            items: [
              {
                _id: '60c72b2f9b1e8c001c8e4d3c',
                producto: { _id: '60c72b2f9b1e8c001c8e4d3b', nombre: 'Producto X' },
                cantidad: 2,
                subtotal: 1000
              }
            ],
            cliente: { _id: '60c72b2f9b1e8c001c8e4d3a', nombre: 'Juan' },
            direccion: { _id: '60c72b2f9b1e8c001c8e4d3d', calle: 'Av. Siempre Viva' },
            cupon: { _id: '60c72b2f9b1e8c001c8e4d3e', codigo: 'DESCUENTO10' },
            total: 1500,
            estado: 'pendiente',
            emailCliente: 'cliente@email.com'
          }
        ]
      }
    }
    #swagger.responses[500] = {
      description: 'Error interno del servidor',
      schema: {
        status: 'ERROR',
        msg: 'Error procesando operación',
        causa: 'Descripción del error específico'
      }
    }
  */
  pedidoCtrl.getPedidos
);

// Obtener pedido por ID
Router.get("/:id",
  /*
    #swagger.path = '/api/pedido/{id}'
    #swagger.tags = ['Pedidos']
    #swagger.summary = 'Obtener pedido por ID'
    #swagger.description = 'Devuelve un pedido específico por su ID, incluyendo items, dirección, cupón y cliente.'
    #swagger.parameters['id'] = {
      in: 'path',
      required: true,
      description: 'ID del pedido',
      type: 'string'
    }
    #swagger.responses[200] = {
      description: 'Pedido encontrado',
      schema: {
        status: 'OK',
        msg: 'Pedido obtenido correctamente',
        pedido: {
          _id: '60c72b2f9b1e8c001c8e4d3f',
          items: [
            {
              _id: '60c72b2f9b1e8c001c8e4d3c',
              producto: { _id: '60c72b2f9b1e8c001c8e4d3b', nombre: 'Producto X' },
              cantidad: 2,
              subtotal: 1000
            }
          ],
          cliente: { _id: '60c72b2f9b1e8c001c8e4d3a', nombre: 'Juan' },
          direccion: { _id: '60c72b2f9b1e8c001c8e4d3d', calle: 'Av. Siempre Viva' },
          cupon: { _id: '60c72b2f9b1e8c001c8e4d3e', codigo: 'DESCUENTO10' },
          total: 1500,
          estado: 'pendiente',
          emailCliente: 'cliente@email.com'
        }
      }
    }
    #swagger.responses[404] = {
      description: 'Pedido no encontrado',
      schema: {
        status: 'ERROR',
        msg: 'Pedido no encontrado'
      }
    }
    #swagger.responses[500] = {
      description: 'Error interno del servidor',
      schema: {
        status: 'ERROR',
        msg: 'Error procesando operación',
        causa: 'Descripción del error específico'
      }
    }
  */
  pedidoCtrl.getPedidoById
);

// Obtener pedidos por ID de cliente
Router.get("/cliente/:id",
  /*
    #swagger.path = '/api/pedido/cliente/{id}'
    #swagger.tags = ['Pedidos']
    #swagger.summary = 'Obtener pedidos por ID de cliente'
    #swagger.description = 'Devuelve todos los pedidos realizados por un cliente específico.'
    #swagger.parameters['id'] = {
      in: 'path',
      required: true,
      description: 'ID del cliente',
      type: 'string'
    }
    #swagger.responses[200] = {
      description: 'Pedidos encontrados',
      schema: {
        status: 'OK',
        msg: 'Pedidos obtenidos correctamente',
        pedidos: [
          {
            _id: '60c72b2f9b1e8c001c8e4d3f',
            items: [
              {
                _id: '60c72b2f9b1e8c001c8e4d3c',
                producto: { _id: '60c72b2f9b1e8c001c8e4d3b', nombre: 'Producto X' },
                cantidad: 2,
                subtotal: 1000
              }
            ],
            cliente: { _id: '60c72b2f9b1e8c001c8e4d3a', nombre: 'Juan' },
            direccion: { _id: '60c72b2f9b1e8c001c8e4d3d', calle: 'Av. Siempre Viva' },
            cupon: { _id: '60c72b2f9b1e8c001c8e4d3e', codigo: 'DESCUENTO10' },
            total: 1500,
            estado: 'pendiente',
            emailCliente: 'cliente@email.com'
          }
        ]
      }
    }
    #swagger.responses[404] = {
      description: 'No se encontraron pedidos para este usuario',
      schema: {
        status: 'ERROR',
        msg: 'No se encontraron pedidos para este usuario'
      }
    }
    #swagger.responses[500] = {
      description: 'Error interno del servidor',
      schema: {
        status: 'ERROR',
        msg: 'Error procesando operación',
        causa: 'Descripción del error específico'
      }
    }
  */
  pedidoCtrl.getPedidoByUsserId
);

// Actualizar pedido por ID
Router.put("/:id",
  /*
    #swagger.path = '/api/pedido/{id}'
    #swagger.tags = ['Pedidos']
    #swagger.summary = 'Actualizar pedido por ID'
    #swagger.description = 'Actualiza los datos de un pedido existente por su ID. El total y el cupón se recalculan automáticamente.'
    #swagger.parameters['id'] = {
      in: 'path',
      required: true,
      description: 'ID del pedido',
      type: 'string'
    }
    #swagger.parameters['body'] = {
      in: 'body',
      required: true,
      description: 'Datos a actualizar del pedido',
      schema: {
        items: [
          { _id: '60c72b2f9b1e8c001c8e4d3c', cantidad: 3 }
        ],
        direccion: '60c72b2f9b1e8c001c8e4d3d',
        cupon: { codigo: 'DESCUENTO10' },
        estado: 'enviado'
      }
    }
    #swagger.responses[200] = {
      description: 'Pedido actualizado correctamente',
      schema: {
        status: 'OK',
        msg: 'Pedido actualizado correctamente',
        pedido: {
          _id: '60c72b2f9b1e8c001c8e4d3f',
          items: [
            {
              _id: '60c72b2f9b1e8c001c8e4d3c',
              producto: { _id: '60c72b2f9b1e8c001c8e4d3b', nombre: 'Producto X' },
              cantidad: 3,
              subtotal: 1500
            }
          ],
          cliente: { _id: '60c72b2f9b1e8c001c8e4d3a', nombre: 'Juan' },
          direccion: { _id: '60c72b2f9b1e8c001c8e4d3d', calle: 'Av. Siempre Viva' },
          cupon: { _id: '60c72b2f9b1e8c001c8e4d3e', codigo: 'DESCUENTO10' },
          total: 1350,
          estado: 'enviado',
          emailCliente: 'cliente@email.com'
        }
      }
    }
    #swagger.responses[404] = {
      description: 'Pedido no encontrado',
      schema: {
        status: 'ERROR',
        msg: 'Pedido no encontrado'
      }
    }
    #swagger.responses[400] = {
      description: 'Error de validación o datos incorrectos',
      schema: {
        status: 'ERROR',
        msg: 'Uno o más items no existen'
      }
    }
    #swagger.responses[500] = {
      description: 'Error interno del servidor',
      schema: {
        status: 'ERROR',
        msg: 'Error procesando operación',
        causa: 'Descripción del error específico'
      }
    }
  */
  pedidoCtrl.updatePedido
);

// Eliminar pedido por ID
Router.delete("/:id",
  /*
    #swagger.path = '/api/pedido/{id}'
    #swagger.tags = ['Pedidos']
    #swagger.summary = 'Eliminar pedido por ID'
    #swagger.description = 'Elimina un pedido existente por su ID.'
    #swagger.parameters['id'] = {
      in: 'path',
      required: true,
      description: 'ID del pedido',
      type: 'string'
    }
    #swagger.responses[200] = {
      description: 'Pedido eliminado correctamente',
      schema: {
        status: 'OK',
        msg: 'Pedido eliminado correctamente'
      }
    }
    #swagger.responses[404] = {
      description: 'Pedido no encontrado',
      schema: {
        status: 'ERROR',
        msg: 'Pedido no encontrado'
      }
    }
    #swagger.responses[500] = {
      description: 'Error interno del servidor',
      schema: {
        status: 'ERROR',
        msg: 'Error procesando operación',
        causa: 'Descripción del error específico'
      }
    }
  */
  pedidoCtrl.deletePedido
);

module.exports = Router;