const Usuario = require("./../models/usuario");

// Importar dotenv para manejar variables de entorno
require("dotenv").config();

// Importar el módulo sanitize-html para sanitizar entradas
const sanitizeHtml = require("sanitize-html");

// Importar el cliente OAuth2 de Google
const { OAuth2Client } = require("google-auth-library");

// Crear una instancia del cliente OAuth2 con el ID de cliente de Google
const cliente = new OAuth2Client(
  "494017255948-hr66km4if477k8fcavbm6k3bio5e9s8d.apps.googleusercontent.com"
);

const usuarioCtrl = {};

// Importar el módulo bcrypt para encriptar contraseñas
const bcrypt = require("bcrypt");

// Importar el módulo jsonwebtoken para generar tokens JWT
const jwt = require("jsonwebtoken");
// Importar el módulo de validación de Express
const { validationResult } = require("express-validator");
const { default: mongoose } = require("mongoose");

// Crea un nuevo usuario
usuarioCtrl.createUsuario = async (req, res) => {
  try {
    // Sanitizar los campos de entrada para evitar inyecciones de HTML
    const camposSanitizados = {
      username: sanitizeHtml(req.body.username),
      email: sanitizeHtml(req.body.email),
      nombres: sanitizeHtml(req.body.nombres),
      apellido: sanitizeHtml(req.body.apellido),
    };

    //Verificar email registrado
    let emailRegistrado = await Usuario.findOne({
      email: camposSanitizados.email,
    });
    if (emailRegistrado) {
      return res.status(409).json({
        status: 0,
        msg: "El email ya está registrado",
      });
    }

    // Verificar username registrado
    let usernameRegistrado = await Usuario.findOne({
      username: camposSanitizados.username,
    });
    if (usernameRegistrado) {
      return res.status(409).json({
        status: 0,
        msg: "El nombre de usuario ya está registrado",
      });
    }

    // Encriptar la contraseña antes de guardar
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    //Crear usuario con el password encriptado
    const usuario = new Usuario({
      ...camposSanitizados,
      password: hashedPassword,
      rol: req.body.rol || "cliente",
    });

    await usuario.save();

    res.status(201).json({
      status: 1,
      msg: "Usuario guardado correctamente",
    });
  } catch (error) {
    res.status(400).json({
      status: 0,
      msg: "Error procesando operación",
    });
  }
};

// Obtiene todos los usuarios
usuarioCtrl.getUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.status(200).json({
      status: 1,
      msg: "Usuarios obtenidos correctamente",
      data: usuarios,
    });
  } catch (error) {
    res.status(500).json({
      status: 0,
      msg: "Error del servidor",
    });
  }
};

// Obtiene un usuario por ID
usuarioCtrl.getUsuario = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      status: 0,
      msg: "ID de usuario inválido",
    });
  }

  try {
    const usuario = await Usuario.findById(id).select("-password"); // Evita mandar el password

    if (!usuario) {
      return res.status(404).json({
        status: 0,
        msg: "El usuario no existe",
      });
    }

    res.status(200).json({
      status: 1,
      msg: "Usuario encontrado",
      data: usuario,
    });
  } catch (error) {
    res.status(500).json({
      status: 0,
      msg: "Error del servidor",
    });
  }
};

// Iniciar sesión con usuario y contraseña
usuarioCtrl.loginUsuario = async (req, res) => {
  try {
    // Validar que se envíen los campos necesarios
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({
        status: 0,
        msg: "Faltan campos requeridos",
        errors: errores.array(),
      });
    }

    const { username, password } = req.body;
    // Retorna un objeto que cumpla con los criterios de busqueda
    const usuario = await Usuario.findOne({ username });

    if (!usuario) {
      return res.status(401).json({
        status: 0,
        msg: "Usuario o contraseña incorrectos",
      });
    }

    // Comparamos el password enviado con el almacenado
    const match = await bcrypt.compare(password, usuario.password);

    if (!match) {
      return res.status(401).json({
        status: 0,
        msg: "Usuario o contraseña incorrectos",
      });
    }

    // Generar token JWT
    const token = jwt.sign({ id: usuario._id, rol: usuario.rol }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      status: 1,
      msg: "Login exitoso",
      token: token,
      username: sanitizeHtml(usuario.username),
      rol: usuario.rol,
      userId: usuario._id,
      email: usuario.email, // Retorno de información útil para el frontend
      nombres: sanitizeHtml(usuario.nombres),
      apellido: sanitizeHtml(usuario.apellido),
    });
  } catch (error) {
    res.status(500).json({
      status: 0,
      msg: "Error del servidor",
    });
  }
};

// Iniciar sesión con Google
usuarioCtrl.loginGoogle = async (req, res) => {
  const { token } = req.body;

  // Verificar validación del token
  if (!token || typeof token != "string" || token.trim() === "") {
    return res.status(400).json({
      status: 0,
      msg: "Token de Google requerido",
    });
  }

  try {
    // Verificar token de Google
    const ticket = await cliente.verifyIdToken({
      idToken: token,
      audience:
        "494017255948-hr66km4if477k8fcavbm6k3bio5e9s8d.apps.googleusercontent.com",
    });
    // Obtiene todos los datos del usuario de Google
    const payload = ticket.getPayload();

    // Buscar usuario por email
    let usuario = await Usuario.findOne({ email: payload.email });

    if (!usuario) {
      // Google no da el password
      // Si no existe, crear usuario con password aleatorio
      const saltRounds = 10;
      const randomPassword = Math.random().toString(36).slice(-8); // password aleatorio
      const hashedPassword = await bcrypt.hash(randomPassword, saltRounds);

      usuario = new Usuario({
        username: payload.name,
        password: hashedPassword,
        email: payload.email,
        nombres: payload.given_name,
        apellido: payload.family_name,
        rol: "cliente",
      });
      await usuario.save();
    }

    // Generar token JWT
    const jwtToken = jwt.sign({ id: usuario._id, rol: usuario.rol }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      userId: usuario._id,
      username: sanitizeHtml(usuario.username),
      email: usuario.email,
      imagen: payload.picture,
      nombres: sanitizeHtml(usuario.nombres),
      apellido: sanitizeHtml(usuario.apellido),
      rol: usuario.rol,
      token: jwtToken,
    });
  } catch (error) {
    res.status(401).json({ msg: "Token de Google inválido" });
  }
};

// Actualiza un usuario
usuarioCtrl.updateUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    // Sanitizar entrada de datos
    const datosActualizados = {
      username: sanitizeHtml(req.body.username),
      nombres: sanitizeHtml(req.body.nombres), // Protección contra XSS
      apellido: sanitizeHtml(req.body.apellido),
    };

    // Verificar username
    if (datosActualizados.username) {
      const usernameRegistrado = await Usuario.findOne({
        username: datosActualizados.username,
        _id: { $ne: id },
      });
      if (usernameRegistrado) {
        return res.status(409).json({
          status: 0,
          msg: "El nombre de usuario ya está registrado",
        });
      }
    }

    const usuarioActualizado = await Usuario.findByIdAndUpdate(
      id,
      datosActualizados,
      { new: true }
    );

    if (!usuarioActualizado) {
      return res.status(404).json({
        status: 0,
        msg: "Usuario no encontrado",
      });
    }

    res.status(200).json({
      status: 1,
      msg: "Usuario actualizado correctamente",
      usuario: usuarioActualizado,
    });
  } catch (error) {
    res.status(500).json({
      status: 0,
      msg: "Error del servidor",
    });
  }
};

// Elimina un usuario
usuarioCtrl.deleteUsuario = async (req, res) => {
  const { id } = req.params;

  //Validar que el ID sea válido
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      status: 0,
      msg: "ID de usuario inválido",
    });
  }

  try {
    const resultado = await Usuario.deleteOne({ _id: id });
    if (resultado.deletedCount === 0) {
      return res.status(404).json({
        status: 0,
        msg: "Usuario no encontrado",
      });
    }

    res.status(200).json({
      status: 1,
      msg: "Usuario eliminado correctamente",
    });
  } catch (error) {
    res.status(500).json({
      status: 0,
      msg: "Error del servidor",
    });
  }
};

// Filtra usuarios de acuerdo a un nombre de usuario (búsqueda parcial)
usuarioCtrl.getUsuariosByUsername = async (req, res) => {
  const { username } = req.params;

  if (!username || username.trim() === "") {
    return res.status(400).json({
      status: 0,
      msg: "El nombre de usuario es requerido para la búsqueda",
    });
  }

  try {
    const usuarios = await Usuario.find({
      username: { $regex: username, $options: "i" },
    }).select("-password"); // Evita enviar contraseñas

    res.status(200).json({
      status: 1,
      msg: "Usuarios encontrados",
      data: usuarios,
    });
  } catch (error) {
    res.status(500).json({
      status: 0,
      msg: "Error del servidor",
    });
  }
};

module.exports = usuarioCtrl;
