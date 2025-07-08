const express = require('express');
const direccionCtrl = require('../controllers/direccion.controller.js');
const router = express.Router();

// Crear una nueva dirección
router.post('/',
  /*
    #swagger.path = '/api/direccion'
    #swagger.tags = ['Direcciones']
    #swagger.summary = 'Crear una nueva dirección'
    #swagger.description = 'Permite crear una nueva dirección.'
    #swagger.consumes = ['application/json']
    #swagger.produces = ['application/json']
    #swagger.parameters['direccion'] = {
      in: 'body',
      required: true,
      description: 'Datos de la nueva dirección',
      schema: {
        $calle: 'Av. Siempre Viva',
        $numero: 742,
        $ciudad: 'Springfield',
        $provincia: 'Buenos Aires',
        $codigoPostal: '1234',
        $pais: 'Argentina',
        $usuario: '60c72b2f9b1e8c001c8e4d3a'
      }
    }
    #swagger.responses[201] = {
      description: 'Dirección creada exitosamente',
      schema: {
        status: 'OK',
        msg: 'Dirección guardada correctamente',
        direccion: {
          _id: '60c72b2f9b1e8c001c8e4d3a',
          calle: 'Av. Siempre Viva',
          numero: 742,
          ciudad: 'Springfield',
          provincia: 'Buenos Aires',
          codigoPostal: '1234',
          pais: 'Argentina',
          usuario: '60c72b2f9b1e8c001c8e4d3a'
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
  direccionCtrl.createDireccion
);

// Obtener todas las direcciones
router.get('/',
  /*
    #swagger.path = '/api/direccion'
    #swagger.tags = ['Direcciones']
    #swagger.summary = 'Obtener todas las direcciones'
    #swagger.description = 'Devuelve una lista de todas las direcciones registradas.'
    #swagger.produces = ['application/json']
    #swagger.responses[200] = {
      description: 'Lista de direcciones obtenida exitosamente',
      schema: {
        status: 'OK',
        direcciones: [
          {
            _id: '60c72b2f9b1e8c001c8e4d3a',
            calle: 'Av. Siempre Viva',
            numero: 742,
            ciudad: 'Springfield',
            provincia: 'Buenos Aires',
            codigoPostal: '1234',
            pais: 'Argentina',
            usuario: '60c72b2f9b1e8c001c8e4d3a'
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
  direccionCtrl.getDirecciones
);

// Obtener dirección por ID
router.get('/:id',
  /*
    #swagger.path = '/api/direccion/{id}'
    #swagger.tags = ['Direcciones']
    #swagger.summary = 'Obtener dirección por ID'
    #swagger.description = 'Devuelve una dirección específica por su ID.'
    #swagger.parameters['id'] = {
      in: 'path',
      required: true,
      description: 'ID de la dirección',
      type: 'string'
    }
    #swagger.responses[200] = {
      description: 'Dirección encontrada',
      schema: {
        status: 'OK',
        direccion: {
          _id: '60c72b2f9b1e8c001c8e4d3a',
          calle: 'Av. Siempre Viva',
          numero: 742,
          ciudad: 'Springfield',
          provincia: 'Buenos Aires',
          codigoPostal: '1234',
          pais: 'Argentina',
          usuario: '60c72b2f9b1e8c001c8e4d3a'
        }
      }
    }
    #swagger.responses[404] = {
      description: 'Dirección no encontrada',
      schema: {
        status: 'ERROR',
        msg: 'Dirección no encontrada'
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
  direccionCtrl.getDireccionById
);

// Actualizar dirección por ID
router.put('/:id',
  /*
    #swagger.path = '/api/direccion/{id}'
    #swagger.tags = ['Direcciones']
    #swagger.summary = 'Actualizar dirección por ID'
    #swagger.description = 'Actualiza los datos de una dirección existente por su ID.'
    #swagger.parameters['id'] = {
      in: 'path',
      required: true,
      description: 'ID de la dirección',
      type: 'string'
    }
    #swagger.parameters['body'] = {
      in: 'body',
      required: true,
      description: 'Datos a actualizar de la dirección',
      schema: {
        calle: 'Av. Siempre Viva',
        numero: 123,
        ciudad: 'Springfield',
        provincia: 'Buenos Aires',
        codigoPostal: '1234',
        pais: 'Argentina'
      }
    }
    #swagger.responses[200] = {
      description: 'Dirección actualizada correctamente',
      schema: {
        status: 'OK',
        msg: 'Dirección actualizada correctamente',
        direccion: {
          _id: '60c72b2f9b1e8c001c8e4d3a',
          calle: 'Av. Siempre Viva',
          numero: 123,
          ciudad: 'Springfield',
          provincia: 'Buenos Aires',
          codigoPostal: '1234',
          pais: 'Argentina',
          usuario: '60c72b2f9b1e8c001c8e4d3a'
        }
      }
    }
    #swagger.responses[404] = {
      description: 'Dirección no encontrada',
      schema: {
        status: 'ERROR',
        msg: 'Dirección no encontrada'
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
  direccionCtrl.updateDireccion
);

// Eliminar dirección por ID
router.delete('/:id',
  /*
    #swagger.path = '/api/direccion/{id}'
    #swagger.tags = ['Direcciones']
    #swagger.summary = 'Eliminar dirección por ID'
    #swagger.description = 'Elimina una dirección existente por su ID.'
    #swagger.parameters['id'] = {
      in: 'path',
      required: true,
      description: 'ID de la dirección',
      type: 'string'
    }
    #swagger.responses[200] = {
      description: 'Dirección eliminada correctamente',
      schema: {
        status: 'OK',
        msg: 'Dirección eliminada correctamente'
      }
    }
    #swagger.responses[404] = {
      description: 'Dirección no encontrada',
      schema: {
        status: 'ERROR',
        msg: 'Dirección no encontrada'
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
  direccionCtrl.deleteDireccion
);

module.exports = router;
