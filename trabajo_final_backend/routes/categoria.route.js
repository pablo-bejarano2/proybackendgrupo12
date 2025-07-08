const categoriaCtrl = require("./../controllers/categoria.controller");

const express = require("express");

const router = express.Router();

router.post("/",
    /*
        #swagger.path = '/api/categoria'
        #swagger.tags = ['Categorías']
        #swagger.summary = 'Crear una nueva categoria'
        #swagger.description = 'Permite crear una nueva categoria'
        #swagger.consumes = ['application/json']
        #swagger.produces = ['application/json']
        #swagger.parameters['categoria'] = {
            in: 'body',
            required: true,
            description: 'Datos de la nuevacategoria',
            schema: {
                $nombre: 'Remeras',
                $descripcion: 'Categoria para remeras',
            }
        }
        #swagger.responses[200] = {
            description: 'Categoria creada exitosamente',
            schema: {
                status: 'OK',
                msg: 'Categoria para remeras',
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
        #swagger.responses[409] = {
            description: 'Conflicto: Ya existe una categoría con el mismo nombre o descripción',
            schema: {
                status: 'ERROR',
                msg: 'Ya existe una categoría con el mismo nombre o descripción'
            }
        }     
    */ 
   categoriaCtrl.createCategoria
);

router.get("/",
    /*
        #swagger.path = '/api/categoria/'
        #swagger.tags = ['Categorías']
        #swagger.summary = 'Obtener todas las categorías'
        #swagger.description = 'Devuelve una lista de todas las categorías disponibles en el sistema.'
        #swagger.produces = ['application/json']
        #swagger.responses[200] = {
            description: 'Lista de categorías obtenida exitosamente',
            schema: {
                status: 'OK',
                msg: 'Lista de categorías',
                data: [
                    {
                        _id: '60c72b2f9b1e8c001c8e4d3a',
                        nombre: 'Remeras',
                        descripcion: 'Categoria para remeras'
                    },
                ]
            }
        }
        #swagger.responses[404] = {
            description: 'No se encontraron categorías en el sistema',
            schema: {
                status: 'ERROR',
                msg: 'No se encontraron categorias'
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
    categoriaCtrl.getCategorias
);

router.delete("/:id"
    /*
        #swagger.path = '/api/categoria/{id}'
        #swagger.tags = ['Categorías']
        #swagger.summary = 'Eliminar una categoria por ID'
        #swagger.description = 'Permite eliminar una categoria existente por su ID'
        #swagger.produces = ['application/json']
        #swagger.parameters['id'] = {
            in: 'path',
            required: true,
            description: 'ID de la categoria a eliminar',
            type: 'string'
        }
        #swagger.responses[200] = {
            description: 'Categoria eliminada exitosamente',
            schema: {
                status: 'OK',
                msg: 'Categoria eliminada exitosamente'
            }
        }
        #swagger.responses[400] = {
            description: 'Error de validación o datos incorrectos',
            schema: {
                status: 'ERROR',
                msg: 'Error procesando operación',
            }
        }
        #swagger.responses[404] = {
            description: 'Categoria no encontrada',
            schema: {
                status: 'ERROR',
                msg: 'Categoria no encontrada'
            }
        }
        #swagger.responses[500] = {
            description: 'Error interno del servidor',
            schema: {
                status: 'ERROR',
                msg: 'Error procesando operación',
            }
        }
    */,
    categoriaCtrl.eliminarCategoria
);
module.exports = router;
