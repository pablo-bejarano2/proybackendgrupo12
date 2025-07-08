const express = require("express");
const productoCtrl = require("../controllers/producto.controller.js");
const upload = require("../config/multer");

const router = express.Router();

// Subir imágenes (solo imágenes, sin datos de producto)
router.post("/upload", upload.array("imagenes", 5),
  /*
    #swagger.path = '/api/producto/upload'
    #swagger.tags = ['Productos']
    #swagger.summary = 'Subir imágenes de producto'
    #swagger.description = 'Permite subir hasta 5 imágenes y devuelve las URLs de los archivos subidos.'
    #swagger.consumes = ['multipart/form-data']
    #swagger.produces = ['application/json']
    #swagger.parameters['imagenes'] = {
      in: 'formData',
      type: 'array',
      required: true,
      description: 'Imágenes del producto (máx 5)',
      items: { type: 'file' }
    }
    #swagger.responses[200] = {
      description: 'Imágenes subidas correctamente',
      schema: { urls: ['/uploads/imagen1.jpg', '/uploads/imagen2.jpg'] }
    }
  */
  (req, res) => {
    const urls = req.files.map(file => file.path);
    res.json({ urls });
  }
);

// Crear producto con imágenes y datos en una sola petición
router.post("/", upload.array("imagenes", 5),
  /*
    #swagger.path = '/api/producto'
    #swagger.tags = ['Productos']
    #swagger.summary = 'Crear un nuevo producto'
    #swagger.description = 'Permite crear un producto con imágenes y datos en una sola petición. Las imágenes se suben como multipart/form-data.'
    #swagger.consumes = ['multipart/form-data']
    #swagger.produces = ['application/json']
    #swagger.parameters['imagenes'] = {
      in: 'formData',
      type: 'array',
      required: false,
      description: 'Imágenes del producto (máx 5)',
      items: { type: 'file' }
    }
    #swagger.parameters['body'] = {
      in: 'formData',
      required: true,
      description: 'Datos del producto',
      schema: {
        $nombre: 'Remera Azul',
        $descripcion: 'Remera de algodón color azul',
        $precio: 1500,
        $color: 'Azul',
        $categoria: '60c72b2f9b1e8c001c8e4d3a',
        $tallas: [
          { talla: 'S', stock: 10 },
          { talla: 'M', stock: 5 },
          { talla: 'L', stock: 2 }
        ]
      }
    }
    #swagger.responses[201] = {
      description: 'Producto creado exitosamente',
      schema: {
        status: 'OK',
        msg: 'Producto guardado correctamente',
        producto: {
          _id: '60c72b2f9b1e8c001c8e4d3b',
          nombre: 'Remera Azul',
          descripcion: 'Remera de algodón color azul',
          precio: 1500,
          color: 'Azul',
          imagenes: ['/uploads/imagen1.jpg'],
          categoria: '60c72b2f9b1e8c001c8e4d3a',
          tallas: [
            { talla: 'S', stock: 10 },
            { talla: 'M', stock: 5 },
            { talla: 'L', stock: 2 }
          ]
        }
      }
    }
    #swagger.responses[400] = {
      description: 'Error de validación o datos incorrectos',
      schema: {
        status: 'ERROR',
        msg: 'Ya existe un producto con ese nombre'
      }
    }
  */
  productoCtrl.createProducto
);

// Actualizar producto con imágenes y datos en una sola petición
router.put("/:id", upload.array("imagenes", 5),
  /*
    #swagger.path = '/api/producto/{id}'
    #swagger.tags = ['Productos']
    #swagger.summary = 'Actualizar producto por ID'
    #swagger.description = 'Actualiza los datos de un producto existente por su ID. Si se suben nuevas imágenes, reemplaza las anteriores.'
    #swagger.consumes = ['multipart/form-data']
    #swagger.produces = ['application/json']
    #swagger.parameters['id'] = {
      in: 'path',
      required: true,
      description: 'ID del producto',
      type: 'string'
    }
    #swagger.parameters['imagenes'] = {
      in: 'formData',
      type: 'array',
      required: false,
      description: 'Nuevas imágenes del producto (máx 5)',
      items: { type: 'file' }
    }
    #swagger.parameters['body'] = {
      in: 'formData',
      required: true,
      description: 'Datos a actualizar del producto',
      schema: {
        nombre: 'Remera Azul',
        descripcion: 'Remera de algodón color azul',
        precio: 1500,
        color: 'Azul',
        categoria: '60c72b2f9b1e8c001c8e4d3a',
        tallas: [
          { talla: 'S', stock: 10 },
          { talla: 'M', stock: 5 },
          { talla: 'L', stock: 2 }
        ]
      }
    }
    #swagger.responses[200] = {
      description: 'Producto actualizado correctamente',
      schema: {
        status: 'OK',
        msg: 'Producto actualizado',
        producto: {
          _id: '60c72b2f9b1e8c001c8e4d3b',
          nombre: 'Remera Azul',
          descripcion: 'Remera de algodón color azul',
          precio: 1500,
          color: 'Azul',
          imagenes: ['/uploads/imagen1.jpg'],
          categoria: '60c72b2f9b1e8c001c8e4d3a',
          tallas: [
            { talla: 'S', stock: 10 },
            { talla: 'M', stock: 5 },
            { talla: 'L', stock: 2 }
          ]
        }
      }
    }
    #swagger.responses[404] = {
      description: 'Producto no encontrado',
      schema: {
        status: 'ERROR',
        msg: 'Producto no encontrado'
      }
    }
    #swagger.responses[409] = {
      description: 'Ya existe un producto con ese nombre',
      schema: {
        status: 'ERROR',
        msg: 'Ya existe un producto con ese nombre'
      }
    }
    #swagger.responses[400] = {
      description: 'Error de validación o datos incorrectos',
      schema: {
        status: 'ERROR',
        msg: 'Error procesando operación'
      }
    }
  */
  productoCtrl.updateProducto
);

// Obtener todos los productos
router.get("/",
  /*
    #swagger.path = '/api/producto'
    #swagger.tags = ['Productos']
    #swagger.summary = 'Obtener todos los productos'
    #swagger.description = 'Devuelve una lista de todos los productos, incluyendo la categoría.'
    #swagger.produces = ['application/json']
    #swagger.responses[200] = {
      description: 'Lista de productos obtenida exitosamente',
      schema: {
        status: 'OK',
        msg: 'Productos obtenidos correctamente',
        productos: [
          {
            _id: '60c72b2f9b1e8c001c8e4d3b',
            nombre: 'Remera Azul',
            descripcion: 'Remera de algodón color azul',
            precio: 1500,
            color: 'Azul',
            imagenes: ['/uploads/imagen1.jpg'],
            categoria: { _id: '60c72b2f9b1e8c001c8e4d3a', nombre: 'Ropa' },
            tallas: [
              { talla: 'S', stock: 10 },
              { talla: 'M', stock: 5 },
              { talla: 'L', stock: 2 }
            ]
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
  productoCtrl.getProductos
);

// Obtener productos por categoría
router.get("/categoria/:categoriaNombre",
  /*
    #swagger.path = '/api/producto/categoria/{categoriaNombre}'
    #swagger.tags = ['Productos']
    #swagger.summary = 'Obtener productos por nombre de categoría'
    #swagger.description = 'Devuelve una lista de productos filtrados por el nombre de la categoría.'
    #swagger.parameters['categoriaNombre'] = {
      in: 'path',
      required: true,
      description: 'Nombre de la categoría',
      type: 'string'
    }
    #swagger.responses[200] = {
      description: 'Productos obtenidos correctamente por categoría',
      schema: {
        status: 'OK',
        msg: 'Productos obtenidos correctamente por categoría',
        productos: [
          {
            _id: '60c72b2f9b1e8c001c8e4d3b',
            nombre: 'Remera Azul',
            categoria: { _id: '60c72b2f9b1e8c001c8e4d3a', nombre: 'Ropa' },
            tallas: [
              { talla: 'S', stock: 10 },
              { talla: 'M', stock: 5 }
            ]
          }
        ]
      }
    }
    #swagger.responses[404] = {
      description: 'Categoría no encontrada',
      schema: {
        status: 'ERROR',
        msg: 'Categoría no encontrada'
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
  productoCtrl.getProductosByCategoria
);

// Buscar productos por nombre (query param)
router.get("/nombre",
  /*
    #swagger.path = '/api/producto/nombre'
    #swagger.tags = ['Productos']
    #swagger.summary = 'Buscar productos por nombre'
    #swagger.description = 'Busca productos por nombre usando el query param ?nombre=...'
    #swagger.parameters['nombre'] = {
      in: 'query',
      required: true,
      description: 'Nombre o parte del nombre del producto',
      type: 'string'
    }
    #swagger.responses[200] = {
      description: 'Productos obtenidos correctamente',
      schema: {
        status: 'OK',
        msg: 'Productos obtenidos correctamente',
        productos: [
          {
            _id: '60c72b2f9b1e8c001c8e4d3b',
            nombre: 'Remera Azul',
            tallas: [
              { talla: 'S', stock: 10 }
            ]
          }
        ]
      }
    }
    #swagger.responses[404] = {
      description: 'No se encontraron productos',
      schema: {
        status: 'ERROR',
        msg: 'No se encontraron productos'
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
  productoCtrl.getProductosByNombre
);

// Obtener producto por ID
router.get("/:id",
  /*
    #swagger.path = '/api/producto/{id}'
    #swagger.tags = ['Productos']
    #swagger.summary = 'Obtener producto por ID'
    #swagger.description = 'Devuelve un producto específico por su ID, incluyendo la categoría.'
    #swagger.parameters['id'] = {
      in: 'path',
      required: true,
      description: 'ID del producto',
      type: 'string'
    }
    #swagger.responses[200] = {
      description: 'Producto encontrado',
      schema: {
        _id: '60c72b2f9b1e8c001c8e4d3b',
        nombre: 'Remera Azul',
        descripcion: 'Remera de algodón color azul',
        precio: 1500,
        color: 'Azul',
        imagenes: ['/uploads/imagen1.jpg'],
        categoria: { _id: '60c72b2f9b1e8c001c8e4d3a', nombre: 'Ropa' },
        tallas: [
          { talla: 'S', stock: 10 },
          { talla: 'M', stock: 5 }
        ]
      }
    }
    #swagger.responses[404] = {
      description: 'Producto no encontrado',
      schema: {
        status: 'ERROR',
        msg: 'Producto no encontrado'
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
  productoCtrl.getProductoById
);

// Eliminar producto por ID
router.delete("/:id",
  /*
    #swagger.path = '/api/producto/{id}'
    #swagger.tags = ['Productos']
    #swagger.summary = 'Eliminar producto por ID'
    #swagger.description = 'Elimina un producto existente por su ID.'
    #swagger.parameters['id'] = {
      in: 'path',
      required: true,
      description: 'ID del producto',
      type: 'string'
    }
    #swagger.responses[200] = {
      description: 'Producto eliminado correctamente',
      schema: { message: 'Producto eliminado' }
    }
    #swagger.responses[404] = {
      description: 'Producto no encontrado',
      schema: {
        status: 'ERROR',
        msg: 'Producto no encontrado'
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
  productoCtrl.deleteProducto
);

module.exports = router;