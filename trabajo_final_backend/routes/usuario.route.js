const usuarioCtrl = require("./../controllers/usuario.controller");
const authCtrl = require("./../controllers/auth.controller");

const { body, validationResult } = require("express-validator");

const express = require("express");

const router = express.Router();

//No es necesario verificar el token para la creación de un usuario,
//ya que se trata de una operación de registro inicial y puede
//ser realizada por cualquier usuario no autenticado
router.post("/", usuarioCtrl.createUsuario);
//No es necesario verificar el token para el login, ya que se trata de una operación de autenticación
router.post(
  "/login",
  [
    body("username").isString().trim().notEmpty(),
    body("password").isString().notEmpty(),
  ],
  usuarioCtrl.loginUsuario
);
router.post("/login/google", usuarioCtrl.loginGoogle);
//Rutas protegidas que requieren verificación de token
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
