const usuarioCtrl = require("./../controllers/usuario.controller");
const authCtrl = require("./../controllers/auth.controller");

const { body } = require("express-validator");

const express = require("express");

const router = express.Router();

router.post(
  "/",
  /*
    #swagger.path = '/api/usuario/'
    #swagger.tags = ['Usuarios']
    #swagger.summary = 'Registro de nuevo usuario'
    #swagger.description = 'Permite registrar un nuevo usuario.'
    #swagger.consumes = ['application/json']
    #swagger.produces = ['application/json']
    #swagger.parameters['usuario'] = {
      in: 'body',
      required: true,
      description: 'Datos del nuevo usuario',
      schema: {
        $username: 'juan123', 
        $email: 'juan@mail.com',
        $password: '123456',
        $nombres: 'Juan',
        $apellido: 'Pérez',
        $rol: 'cliente'
      }
    }
    #swagger.responses[201] = {
      description: 'Usuario creado exitosamente',
      schema: {
        status: 1,
        msg: 'Usuario guardado correctamente'
      }
    }
    #swagger.responses[409] = {
      description: 'Conflicto: email o username ya registrados',
      schema: {
        status: 0,
        msg: 'El email ya está registrado'
      }
    }
    #swagger.responses[400] = {
      description: 'Solicitud mal formada o error de validación',
      schema: {
        status: 0,
        msg: 'Error procesando operación.'
      }
    }
  */
  usuarioCtrl.createUsuario
);

router.post(
  "/login",
  [
    /*
      #swagger.path = '/api/usuario/login'
      #swagger.tags = ['Usuarios']
      #swagger.summary = 'Inicio de sesión'
      #swagger.description = 'Permite inicio de sesión con nombre de usuario y contraseña.'
      #swagger.consumes = ['application/json']
      #swagger.produces = ['application/json']
      #swagger.parameters['credenciales'] = {
        in: 'body',
        required: true,
        description: 'Credenciales de inicio de sesión',
        schema: {
          $username: 'juan123',
          $password: '123456'
        }
      }
      #swagger.responses[200] = {
        description: 'Inicio de sesión exitoso',
        schema: {
          status: 1,
          msg: 'Login exitoso',
          token: 'jwt_token_aqui',
          username: 'juan123',
          rol: 'cliente',
          userId: '64b789123abc456def789abc',
          email: 'juan@mail.com',
          nombres: 'Juan',
          apellido: 'Pérez'
        }
      }
      #swagger.responses[400] = {
        description: 'Error de validación o petición mal formada',
        schema: {
          status: 0,
          msg: 'Faltan campos requeridos',
          errors: [
            { msg: 'El campo username es obligatorio', param: 'username', location: 'body' }
          ]
        }
      }
      #swagger.responses[401] = {
        description: 'Usuario o contraseña incorrectos',
        schema: {
          status: 0,
          msg: 'Usuario o contraseña incorrectos.'
        }
      }
      #swagger.responses[500] = {
        description: 'Error interno del servidor',
        schema: {
          status: 0,
          msg: 'Error interno del servidor.'
        }
      }
    */
    body("username").isString().trim().escape().notEmpty(),
    body("password").isString().notEmpty(),
  ],
  usuarioCtrl.loginUsuario
);

router.post(
  "/login/google",
  [
    /*
      #swagger.path = '/api/usuario/login/google'
      #swagger.tags = ['Usuarios']
      #swagger.summary = 'Inicio de sesión con Google'
      #swagger.description = 'Permite iniciar sesión con un token JWT de Google. Si el usuario no existe en la base de datos, se crea automáticamente.'
      #swagger.consumes = ['application/json']
      #swagger.produces = ['application/json']
      #swagger.parameters['token'] = {
        in: 'body',
        required: true,
        description: 'Token JWT proporcionado por Google después de autenticarse',
        schema: {
          $token: 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjY4MzFh...'
        }
      }
      #swagger.responses[200] = {
        description: 'Inicio de sesión exitoso con Google',
        schema: {
          status: 1,
          userId: '64e1234567abcde890f12345',
          username: 'Juan Pérez',
          email: 'juan@gmail.com',
          imagen: 'https://lh3.googleusercontent.com/a/AEdFTp6iABC123',
          nombres: 'Juan',
          apellido: 'Pérez',
          rol: 'cliente',
          token: 'jwt_token_generado'
        }
      }
      #swagger.responses[400] = {
        description: 'Falta el token o es inválido',
        schema: {
          status: 0,
          msg: 'Token de Google requerido.'
        }
      }
      #swagger.responses[401] = {
        description: 'Token de Google inválido o expirado',
        schema: {
          status: 0,
          msg: 'Token de Google inválido'
        }
      }
      #swagger.responses[500] = {
        description: 'Error interno del servidor',
        schema: {
          status: 0,
          msg: 'Error interno al procesar el inicio de sesión'
        }
      }
    */
    body("token").isString().notEmpty(),
  ],
  usuarioCtrl.loginGoogle
);

// ------------------------------------------------------
// Rutas protegidas que requieren verificación de token
// ------------------------------------------------------

router.put(
  "/:id",
  /*
    #swagger.path = '/api/usuario/{id}'
    #swagger.tags = ['Usuarios']
    #swagger.summary = 'Actualización de usuario'
    #swagger.description = 'Actualiza un usuario existente'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'ID del usuario a actualizar',
      required: true,
      type: 'string'
    }
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Datos del usuario a actualizar',
      required: true,
      schema: {
        "application/json": {
          schema: {  
            type: 'object',
            properties: {
              username: { type: 'string', example: 'juan123' },
              nombres: { type: 'string', example: 'Juan Ariel' },
              apellido: { type: 'string', example: 'Velazco' }
            }
          }
        }
      }
    }
    #swagger.responses[200] = {
      description: 'Usuario actualizado correctamente',
      schema: {
        status: 1,
        msg: 'Usuario actualizado correctamente',
        usuario: {
          _id: '60af8840f1a4c72f243b6e5d',
          username: 'juan123',
          password: 'passwordDeJuan',
          email: 'juan123@gmail.com',
          nombres: 'Juan Ariel',
          apellido: 'Velazco',
          rol: 'cliente'
        }
      }
    }
    #swagger.responses[401] = {
      description: 'Token de autorización no válido',
      schema: {
        status: 0,
        msg: 'Token de autorización no válido'
      }
    }
    #swagger.responses[404] = {
      description: 'Usuario no encontrado',
      schema: {
        status: 0,
        msg: 'Usuario no encontrado'
      }
    }
    #swagger.responses[409] = {
      description: 'Conflicto: nombre de usuario ya registrado',
      schema: {
        status: 0,
        msg: 'El nombre de usuario ya está registrado'
      }
    }
    #swagger.responses[500] = {
      description: 'Error del servidor',
      schema: {
        status: 0,
        msg: 'Error del servidor'
      }
    }
  */
  authCtrl.verifyToken,
  usuarioCtrl.updateUsuario
);

router.delete(
  "/:id",
  /*
    #swagger.path = '/api/usuario/{id}'
    #swagger.tags = ['Usuarios']
    #swagger.summary = 'Eliminación de usuario'
    #swagger.description = 'Elimina un usuario existente por su ID'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'ID del usuario a eliminar',
      required: true,
      type: 'string'
    }
    #swagger.responses[200] = {
      description: 'Usuario eliminado correctamente',
      schema: {
        status: 1,
        msg: 'Usuario eliminado correctamente'
      }
    }
    #swagger.responses[400] = {
      description: 'ID de usuario inválido',
      schema: {
        status: 0,
        msg: 'ID de usuario no es válido',
      }
    }
    #swagger.responses[401] = {
      description: 'Token de autorización no válido',
      schema: {
        status: 0,
        msg: 'Token de autorización no válido'
      }
    }
    #swagger.responses[404] = {
      description: 'Usuario no encontrado',
      schema: {
        status: 0,
        msg: 'Usuario no encontrado'
      }
    }
    #swagger.responses[500] = {
      description: 'Error del servidor',
      schema: {
        status: 0,
        msg: 'Error del servidor'
      }
    }
  */
  authCtrl.verifyToken,
  usuarioCtrl.deleteUsuario
);

router.get(
  "/",
  /*
    #swagger.path = '/api/usuario/'
    #swagger.tags = ['Usuarios']
    #swagger.summary = 'Retorno de todos los usuarios'
    #swagger.description = 'Obtiene la lista de todos los usuarios'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.responses[200] = {
      description: 'Usuarios obtenidos correctamente',
      schema: {
        status: 1,
        msg: 'Usuarios obtenidos correctamente',
        data: [
          {
            _id: '60af8840f1a4c72f243b6e5d',
            username: 'juan123',
            nombres: 'Juan Ariel',
            apellido: 'Velazco',
            email: 'juan123@gmail.com',
            rol: 'cliente'
          }
        ]
      }
    }
    #swagger.responses[401] = {
      description: 'Token de autorización no válido',
      schema: {
        status: 0,
        msg: 'Token de autorización no válido'
      }
    }
    #swagger.responses[500] = {
      description: 'Error del servidor',
      schema: {
        status: 0,
        msg: 'Error del servidor'
      }
    }
  */
  authCtrl.verifyToken,
  usuarioCtrl.getUsuarios
);

router.get(
  "/:id",
  /*
    #swagger.path = '/api/usuario/{id}'
    #swagger.tags = ['Usuarios']
    #swagger.summary = 'Búsqueda de un usuario por ID'
    #swagger.description = 'Obtiene un usuario por su ID'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'ID del usuario a consultar',
      required: true,
      type: 'string'
    }
    #swagger.responses[200] = {
      description: 'Usuario encontrado',
      schema: {
        status: 1,
        msg: 'Usuario encontrado',
        data: {
          _id: '60af8840f1a4c72f243b6e5d',
          username: 'juan123',
          nombres: 'Juan Ariel',
          apellido: 'Velazco',
          email: 'juan123@gmail.com',
          rol: 'cliente'
        }
      }
    }
    #swagger.responses[400] = {
      description: 'ID inválido',
      schema: {
        status: 0,
        msg: 'ID de usuario no es válido'
      }
    }
    #swagger.responses[401] = {
      description: 'Token de autorización no válido',
      schema: {
        status: 0,
        msg: 'Token de autorización no válido'
      }
    }
    #swagger.responses[404] = {
      description: 'El usuario no existe',
      schema: {
        status: 0,
        msg: 'El usuario no existe'
      }
    }
    #swagger.responses[500] = {
      description: 'Error del servidor',
      schema: {
        status: 0,
        msg: 'Error del servidor'
      }
    }
  */
  authCtrl.verifyToken,
  usuarioCtrl.getUsuario
);

router.get(
  "/filtrado/:username",
  /*
    #swagger.path = '/api/usuario/filtrado/{username}'
    #swagger.tags = ['Usuarios']
    #swagger.summary = 'Búsqueda de usuarios de acuerdo a un nombre de usuario'
    #swagger.description = 'Busca usuarios por coincidencia parcial en el nombre de usuario (insensible a mayúsculas/minúsculas)'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['username'] = {
      in: 'path',
      description: 'Texto parcial del nombre de usuario a buscar',
      required: true,
      type: 'string'
    }
    #swagger.responses[200] = {
      description: 'Usuarios encontrados',
      schema: {
        status: 1,
        msg: 'Usuarios encontrados',
        data: [
          {
            _id: '60af8840f1a4c72f243b6e5d',
            username: 'juan123',
            nombres: 'Juan Ariel',
            apellido: 'Velazco',
            email: 'juan123@gmail.com',
            rol: 'cliente'
          }
        ]
      }
    }
    #swagger.responses[400] = {
      description: 'Parámetro inválido o vacío',
      schema: {
        status: 0,
        msg: 'El nombre de usuario es requerido para la búsqueda'
      }
    }
    #swagger.responses[401] = {
      description: 'Token de autorización no válido',
      schema: {
        status: 0,
        msg: 'Token de autorización no válido'
      }
    }
    #swagger.responses[500] = {
      description: 'Error procesando búsqueda',
      schema: {
        status: 0,
        msg: 'Error del servidor'
      }
    }
  */
  authCtrl.verifyToken,
  usuarioCtrl.getUsuariosByUsername
);

module.exports = router;
