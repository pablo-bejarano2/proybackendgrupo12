const usuarioCtrl = require("./../controllers/usuario.controller");

const express = require("express");

const router = express.Router();

router.post("/", usuarioCtrl.createUsuario);
router.post("/login", usuarioCtrl.loginUsuario);
router.post("/login/google", usuarioCtrl.loginGoogle);
router.put("/:id", usuarioCtrl.updateUsuario);
router.delete("/:id", usuarioCtrl.deleteUsuario);
router.get("/", usuarioCtrl.getUsuarios);

module.exports = router;
