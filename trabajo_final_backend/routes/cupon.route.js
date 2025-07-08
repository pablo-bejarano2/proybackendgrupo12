const express = require('express');
const cuponCtrl = require('../controllers/cupon.controller.js');
const router = express.Router();

// Crear un nuevo cupón
router.post('/',
  /*
    #swagger.path = '/api/cupon'
    #swagger.tags = ['Cupones']
    #swagger.summary = 'Crear un nuevo cupón'
    #swagger.description = 'Permite crear un nuevo cupón.'
    #swagger.consumes = ['application/json']
    #swagger.produces = ['application/json']
    #swagger.parameters['cupon'] = {
      in: 'body',
      required: true,
      description: 'Datos del nuevo cupón',
      schema: {
        $codigo: 'DESCUENTO10',
        $nombre: 'Descuento 10%',
        $descuento: 10,
        $fechaExpiracion: '2025-12-31T00:00:00.000Z',
        $activo: true,
        $usosMaximos: 100,
        $usosRestantes: 100
      }
    }
    #swagger.responses[201] = {
      description: 'Cupón creado exitosamente',
      schema: {
        status: 'OK',
        msg: 'Cupón guardado correctamente',
        cupon: {
          _id: '60c72b2f9b1e8c001c8e4d3a',
          codigo: 'DESCUENTO10',
          nombre: 'Descuento 10%',
          descuento: 10,
          fechaExpiracion: '2025-12-31T00:00:00.000Z',
          activo: true,
          usosMaximos: 100,
          usosRestantes: 100
        }
      }
    }
    #swagger.responses[400] = {
      description: 'Error de validación o datos incorrectos',
      schema: {
        status: 'ERROR',
        msg: 'Error procesando operación',
        causa: 'Descripción del error específico'
      }
    }
  */
  cuponCtrl.createCupon
);

// Obtener todos los cupones
router.get('/',
  /*
    #swagger.path = '/api/cupon'
    #swagger.tags = ['Cupones']
    #swagger.summary = 'Obtener todos los cupones'
    #swagger.description = 'Devuelve una lista de todos los cupones.'
    #swagger.produces = ['application/json']
    #swagger.responses[200] = {
      description: 'Lista de cupones obtenida exitosamente',
      schema: {
        status: 'OK',
        cupones: [
          {
            _id: '60c72b2f9b1e8c001c8e4d3a',
            codigo: 'DESCUENTO10',
            nombre: 'Descuento 10%',
            descuento: 10,
            fechaExpiracion: '2025-12-31T00:00:00.000Z',
            activo: true,
            usosMaximos: 100,
            usosRestantes: 100
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
  cuponCtrl.getCupones
);

// Obtener cupón por ID
router.get('/:id',
  /*
    #swagger.path = '/api/cupon/{id}'
    #swagger.tags = ['Cupones']
    #swagger.summary = 'Obtener cupón por ID'
    #swagger.description = 'Devuelve un cupón específico por su ID.'
    #swagger.parameters['id'] = {
      in: 'path',
      required: true,
      description: 'ID del cupón',
      type: 'string'
    }
    #swagger.responses[200] = {
      description: 'Cupón encontrado',
      schema: {
        status: 'OK',
        cupon: {
          _id: '60c72b2f9b1e8c001c8e4d3a',
          codigo: 'DESCUENTO10',
          nombre: 'Descuento 10%',
          descuento: 10,
          fechaExpiracion: '2025-12-31T00:00:00.000Z',
          activo: true,
          usosMaximos: 100,
          usosRestantes: 100
        }
      }
    }
    #swagger.responses[404] = {
      description: 'Cupón no encontrado',
      schema: {
        status: 'ERROR',
        msg: 'Cupón no encontrado'
      }
    }
    #swagger.responses[400] = {
      description: 'Error de validación o datos incorrectos',
      schema: {
        status: 'ERROR',
        msg: 'Error procesando operación',
        causa: 'Descripción del error específico'
      }
    }
  */
  cuponCtrl.getCuponById
);

// Obtener cupón por código
router.get('/codigo/:codigo',
  /*
    #swagger.path = '/api/cupon/codigo/{codigo}'
    #swagger.tags = ['Cupones']
    #swagger.summary = 'Obtener cupón por código'
    #swagger.description = 'Devuelve un cupón específico por su código.'
    #swagger.parameters['codigo'] = {
      in: 'path',
      required: true,
      description: 'Código del cupón',
      type: 'string'
    }
    #swagger.responses[200] = {
      description: 'Cupón encontrado',
      schema: {
        status: 'OK',
        cupon: {
          _id: '60c72b2f9b1e8c001c8e4d3a',
          codigo: 'DESCUENTO10',
          nombre: 'Descuento 10%',
          descuento: 10,
          fechaExpiracion: '2025-12-31T00:00:00.000Z',
          activo: true,
          usosMaximos: 100,
          usosRestantes: 100
        }
      }
    }
    #swagger.responses[404] = {
      description: 'Cupón no encontrado',
      schema: {
        status: 'ERROR',
        msg: 'Cupón no encontrado'
      }
    }
    #swagger.responses[400] = {
      description: 'Error de validación o datos incorrectos',
      schema: {
        status: 'ERROR',
        msg: 'Error procesando operación',
        causa: 'Descripción del error específico'
      }
    }
  */
  cuponCtrl.getCuponByCodigo
);

// Actualizar cupón por ID
router.put('/:id',
  /*
    #swagger.path = '/api/cupon/{id}'
    #swagger.tags = ['Cupones']
    #swagger.summary = 'Actualizar cupón por ID'
    #swagger.description = 'Actualiza los datos de un cupón existente por su ID.'
    #swagger.parameters['id'] = {
      in: 'path',
      required: true,
      description: 'ID del cupón',
      type: 'string'
    }
    #swagger.parameters['body'] = {
      in: 'body',
      required: true,
      description: 'Datos a actualizar del cupón',
      schema: {
        nombre: 'Descuento 20%',
        descuento: 20,
        fechaExpiracion: '2025-12-31T00:00:00.000Z',
        activo: true,
        usosMaximos: 200,
        usosRestantes: 200
      }
    }
    #swagger.responses[200] = {
      description: 'Cupón actualizado correctamente',
      schema: {
        status: 'OK',
        msg: 'Cupón actualizado correctamente',
        cupon: {
          _id: '60c72b2f9b1e8c001c8e4d3a',
          codigo: 'DESCUENTO10',
          nombre: 'Descuento 20%',
          descuento: 20,
          fechaExpiracion: '2025-12-31T00:00:00.000Z',
          activo: true,
          usosMaximos: 200,
          usosRestantes: 200
        }
      }
    }
    #swagger.responses[404] = {
      description: 'Cupón no encontrado',
      schema: {
        status: 'ERROR',
        msg: 'Cupón no encontrado'
      }
    }
    #swagger.responses[400] = {
      description: 'Error de validación o datos incorrectos',
      schema: {
        status: 'ERROR',
        msg: 'Error procesando operación',
        causa: 'Descripción del error específico'
      }
    }
  */
  cuponCtrl.updateCupon
);

// Eliminar cupón por ID
router.delete('/:id',
  /*
    #swagger.path = '/api/cupon/{id}'
    #swagger.tags = ['Cupones']
    #swagger.summary = 'Eliminar cupón por ID'
    #swagger.description = 'Elimina un cupón existente por su ID.'
    #swagger.parameters['id'] = {
      in: 'path',
      required: true,
      description: 'ID del cupón',
      type: 'string'
    }
    #swagger.responses[200] = {
      description: 'Cupón eliminado correctamente',
      schema: {
        status: 'OK',
        msg: 'Cupón eliminado correctamente'
      }
    }
    #swagger.responses[404] = {
      description: 'Cupón no encontrado',
      schema: {
        status: 'ERROR',
        msg: 'Cupón no encontrado'
      }
    }
    #swagger.responses[400] = {
      description: 'Error de validación o datos incorrectos',
      schema: {
        status: 'ERROR',
        msg: 'Error procesando operación',
        causa: 'Descripción del error específico'
      }
    }
  */
  cuponCtrl.deleteCupon
);

// Aplicar cupón
router.post('/aplicar',
  /*
    #swagger.path = '/api/cupon/aplicar'
    #swagger.tags = ['Cupones']
    #swagger.summary = 'Aplicar cupón'
    #swagger.description = 'Valida y aplica un cupón por su código. Verifica si está activo, no ha expirado y existe.'
    #swagger.consumes = ['application/json']
    #swagger.produces = ['application/json']
    #swagger.parameters['codigo'] = {
      in: 'body',
      required: true,
      description: 'Código del cupón a aplicar',
      schema: {
        $codigo: 'DESCUENTO10'
      }
    }
    #swagger.responses[200] = {
      description: 'Cupón aplicado correctamente',
      schema: {
        status: 'OK',
        msg: 'Cupón aplicado correctamente',
        descuento: 10
      }
    }
    #swagger.responses[404] = {
      description: 'Cupón no encontrado',
      schema: {
        status: 'ERROR',
        msg: 'Cupón no encontrado'
      }
    }
    #swagger.responses[400] = {
      description: 'Cupón no activo, expirado o error de validación',
      schema: {
        status: 'ERROR',
        msg: 'Cupón no está activo o ha expirado'
      }
    }
  */
  cuponCtrl.applyCupon
);

module.exports = router;