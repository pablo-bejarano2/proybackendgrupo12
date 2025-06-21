const usuarioCtrl = require("./../controllers/usuario.controller");

const express = require("express");

const router = express.Router();

router.post("/", usuarioCtrl.createUsuario);
router.post("/login", usuarioCtrl.loginUsuario);
router.get("/", usuarioCtrl.getUsuarios);

module.exports = router;
