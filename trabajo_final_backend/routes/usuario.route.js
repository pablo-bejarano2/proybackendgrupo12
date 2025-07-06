const usuarioCtrl = require("./../controllers/usuario.controller");
const authCtrl = require("./../controllers/auth.controller");

const { body } = require("express-validator");

const express = require("express");

const router = express.Router();

router.post(
  "/",
  /*
    #swagger.path = '/api/usuarios/'
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
      #swagger.path = '/api/usuarios/login'
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
      #swagger.path = '/api/usuarios/login/google'
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
    body("token").isString.notEmpty(),
  ],
  usuarioCtrl.loginGoogle
);

// ------------------------------------------------------
// Rutas protegidas que requieren verificación de token
// ------------------------------------------------------

router.put("/:id", authCtrl.verifyToken, usuarioCtrl.updateUsuario);
router.delete("/:id", authCtrl.verifyToken, usuarioCtrl.deleteUsuario);
router.get("/", authCtrl.verifyToken, usuarioCtrl.getUsuarios);
router.get("/:id", authCtrl.verifyToken, usuarioCtrl.getUsuario);
router.get(
  "/filtrado/:username",
  authCtrl.verifyToken,
  usuarioCtrl.getUsuariosByUsername
);

module.exports = router;
