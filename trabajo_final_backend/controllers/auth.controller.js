const jwt = require("jsonwebtoken");
require("dotenv").config(); // Cargar variables de entorno desde .env

const authCtrl = {};

authCtrl.verifyToken = async (req, res, next) => {
  // Verificar que las llamadas a la API tengan un header de autorización
  if (!req.headers.authorization) {
    return res.status(401).json({
      status: 0,
      msg: "No se ha proporcionado un token de autorización",
    });
  }
  console.log("Token recibido:", req.headers.authorization);
  // Se espera formato: Bearer XXX, interesa el token en posición 1 del arrayTexto
  var arrayTexto = req.headers.authorization.split(" ");
  var token = null;

  // Verificar que el token sea válido
  arrayTexto.length >= 2 ? (token = arrayTexto[1]) : (token = null);
  if (!token) {
    return res.status(401).json({
      status: 0,
      msg: "Token de autorización no válido",
    });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // payload contiene la información del usuario que se ha autenticado
    req.userId = payload.id;
    next(); // Llamada al siguiente middleware o controlador
  } catch (error) {
    res.status(401).json({
      status: 0,
      msg: "Token de autorización no válido",
    });
  }
};

module.exports = authCtrl;
