const express = require("express");
const itemPedidoCtrl = require("../controllers/itemPedido.controller");

const Router = express.Router();

// Crear un nuevo item de pedido
Router.post("/",
  /*
    #swagger.path = '/api/itempedido'
    #swagger.tags = ['ItemsPedido']
    #swagger.summary = 'Crear un nuevo item de pedido'
    #swagger.description = 'Permite crear un nuevo item de pedido. Calcula el subtotal automáticamente según el producto y la cantidad.'
    #swagger.consumes = ['application/json']
    #swagger.produces = ['application/json']
    #swagger.parameters['itemPedido'] = {
      in: 'body',
      required: true,
      description: 'Datos del nuevo item de pedido',
      schema: {
        $producto: '60c72b2f9b1e8c001c8e4d3a',
        $cantidad: 2,
        $pedido: '60c72b2f9b1e8c001c8e4d3b'
      }
    }
    #swagger.responses[201] = {
      description: 'Item de pedido creado exitosamente',
      schema: {
        status: 'OK',
        msg: 'Item de pedido guardado correctamente',
        itemPedido: {
          _id: '60c72b2f9b1e8c001c8e4d3c',
          producto: { _id: '60c72b2f9b1e8c001c8e4d3a', nombre: 'Producto X', precio: 500 },
          cantidad: 2,
          pedido: '60c72b2f9b1e8c001c8e4d3b',
          subtotal: 1000
        }
      }
    }
    #swagger.responses[400] = {
      description: 'Producto no encontrado o error de validación',
      schema: {
        status: 'ERROR',
        msg: 'Producto no encontrado'
      }
    }
  */
  itemPedidoCtrl.createItemPedido
);

// Obtener todos los items de pedido
Router.get("/",
  /*
    #swagger.path = '/api/itempedido'
    #swagger.tags = ['ItemsPedido']
    #swagger.summary = 'Obtener todos los items de pedido'
    #swagger.description = 'Devuelve una lista de todos los items de pedido, incluyendo información del producto.'
    #swagger.produces = ['application/json']
    #swagger.responses[200] = {
      description: 'Lista de items de pedido obtenida exitosamente',
      schema: {
        status: 'OK',
        msg: 'Items de pedido obtenidos correctamente',
        itemsPedido: [
          {
            _id: '60c72b2f9b1e8c001c8e4d3c',
            producto: { _id: '60c72b2f9b1e8c001c8e4d3a', nombre: 'Producto X', precio: 500 },
            cantidad: 2,
            pedido: '60c72b2f9b1e8c001c8e4d3b',
            subtotal: 1000
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
  itemPedidoCtrl.getItemsPedido
);

// Obtener item de pedido por ID
Router.get("/:id",
  /*
    #swagger.path = '/api/itempedido/{id}'
    #swagger.tags = ['ItemsPedido']
    #swagger.summary = 'Obtener item de pedido por ID'
    #swagger.description = 'Devuelve un item de pedido específico por su ID, incluyendo información del producto.'
    #swagger.parameters['id'] = {
      in: 'path',
      required: true,
      description: 'ID del item de pedido',
      type: 'string'
    }
    #swagger.responses[200] = {
      description: 'Item de pedido encontrado',
      schema: {
        status: 'OK',
        msg: 'Item de pedido obtenido correctamente',
        itemPedido: {
          _id: '60c72b2f9b1e8c001c8e4d3c',
          producto: { _id: '60c72b2f9b1e8c001c8e4d3a', nombre: 'Producto X', precio: 500 },
          cantidad: 2,
          pedido: '60c72b2f9b1e8c001c8e4d3b',
          subtotal: 1000
        }
      }
    }
    #swagger.responses[404] = {
      description: 'Item de pedido no encontrado',
      schema: {
        status: 'ERROR',
        msg: 'Item de pedido no encontrado'
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
  itemPedidoCtrl.getItemsPedidoById
);

// Actualizar item de pedido por ID
Router.put("/:id",
  /*
    #swagger.path = '/api/itempedido/{id}'
    #swagger.tags = ['ItemsPedido']
    #swagger.summary = 'Actualizar item de pedido por ID'
    #swagger.description = 'Actualiza los datos de un item de pedido existente por su ID. Calcula el subtotal automáticamente.'
    #swagger.parameters['id'] = {
      in: 'path',
      required: true,
      description: 'ID del item de pedido',
      type: 'string'
    }
    #swagger.parameters['body'] = {
      in: 'body',
      required: true,
      description: 'Datos a actualizar del item de pedido',
      schema: {
        producto: '60c72b2f9b1e8c001c8e4d3a',
        cantidad: 3,
        pedido: '60c72b2f9b1e8c001c8e4d3b'
      }
    }
    #swagger.responses[200] = {
      description: 'Item de pedido actualizado correctamente',
      schema: {
        status: 'OK',
        msg: 'Item de pedido actualizado correctamente',
        itemPedido: {
          _id: '60c72b2f9b1e8c001c8e4d3c',
          producto: { _id: '60c72b2f9b1e8c001c8e4d3a', nombre: 'Producto X', precio: 500 },
          cantidad: 3,
          pedido: '60c72b2f9b1e8c001c8e4d3b',
          subtotal: 1500
        }
      }
    }
    #swagger.responses[404] = {
      description: 'Item de pedido no encontrado',
      schema: {
        status: 'ERROR',
        msg: 'Item de pedido no encontrado'
      }
    }
    #swagger.responses[400] = {
      description: 'Producto no encontrado o error de validación',
      schema: {
        status: 'ERROR',
        msg: 'Producto no encontrado'
      }
    }
  */
  itemPedidoCtrl.updateItemPedido
);

// Eliminar item de pedido por ID
Router.delete("/:id",
  /*
    #swagger.path = '/api/itempedido/{id}'
    #swagger.tags = ['ItemsPedido']
    #swagger.summary = 'Eliminar item de pedido por ID'
    #swagger.description = 'Elimina un item de pedido existente por su ID.'
    #swagger.parameters['id'] = {
      in: 'path',
      required: true,
      description: 'ID del item de pedido',
      type: 'string'
    }
    #swagger.responses[200] = {
      description: 'Item de pedido eliminado correctamente',
      schema: {
        status: 'OK',
        msg: 'Item de pedido eliminado correctamente'
      }
    }
    #swagger.responses[404] = {
      description: 'Item de pedido no encontrado',
      schema: {
        status: 'ERROR',
        msg: 'Item de pedido no encontrado'
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
  itemPedidoCtrl.deleteItemPedido
);

module.exports = Router;
