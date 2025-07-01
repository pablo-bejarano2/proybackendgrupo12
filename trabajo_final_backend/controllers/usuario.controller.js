const Usuario = require("./../models/usuario");

require("dotenv").config();

const { OAuth2Client } = require("google-auth-library");
const cliente = new OAuth2Client(
  "494017255948-hr66km4if477k8fcavbm6k3bio5e9s8d.apps.googleusercontent.com"
);
const usuarioCtrl = {};

// Importar el módulo bcrypt para encriptar contraseñas
const bcrypt = require("bcrypt");

// Importar el módulo jsonwebtoken para generar tokens JWT
const jwt = require("jsonwebtoken");

usuarioCtrl.createUsuario = async (req, res) => {
  try {
    //Verificar email
    let emailRegistrado = await Usuario.findOne({ email: req.body.email });
    if (emailRegistrado) {
      return res.json({
        status: 0,
        msg: "El email ya está registrado",
      });
    }

    // Verificar username
    let usernameRegistrado = await Usuario.findOne({
      username: req.body.username,
    });
    if (usernameRegistrado) {
      return res.json({
        status: 0,
        msg: "El nombre de usuario ya está registrado",
      });
    }
    // Encriptar la contraseña antes de guardar
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    //Crear usuario con el password encriptado
    const usuario = new Usuario({
      ...req.body,
      password: hashedPassword,
      rol: "cliente",
    });

    await usuario.save();

    res.status(200).json({
      status: 1,
      msg: "Usuario guardado correctamente",
    });
  } catch (error) {
    res.status(400).json({
      status: 0,
      msg: "Error procesando operación.",
      causa: error.message,
    });
  }
};

usuarioCtrl.getUsuarios = async (req, res) => {
  var usuarios = await Usuario.find();
  res.status(200).json(usuarios);
};

usuarioCtrl.getUsuario = async (req, res) => {
  const id = req.params.id;
  try {
    const usuario = await Usuario.findById(id);

    if (!usuario) {
      return res.status(404).json({
        status: 0,
        msg: "El usuario no existe",
      });
    }

    res.status(200).json(usuario);
  } catch (error) {
    res.status(400).json({
      status: 0,
      msg: "Error procesando operación.",
      causa: error.message,
    });
  }
};

usuarioCtrl.loginUsuario = async (req, res) => {
  try {
    //1
    const { username, password } = req.body;
    //Retorna un objeto que cumpla con los criterios de busqueda
    const usuario = await Usuario.findOne({ username });

    if (!usuario) {
      return res.status(401).json({
        status: 0,
        msg: "Usuario o contraseña incorrectos.",
      });
    }

    //Comparamos el password enviado con el almacenado
    const match = await bcrypt.compare(password, usuario.password);

    if (!match) {
      return res.status(401).json({
        status: 0,
        msg: "Usuario o contraseña incorrectos.",
      });
    }

    //Generar token JWT
    const token = jwt.sign(
      { id: usuario._id },
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: "1h" }
    );

    res.status(200).json({
      status: 1,
      msg: "Login exitoso",
      token: token,
      username: usuario.username,
      //rol: usuario.rol,
      userId: usuario._id,
      email: usuario.email, //Retorno de información útil para el frontend
      nombres: usuario.nombres,
      apellido: usuario.apellido,
    });
  } catch (error) {
    res.status(400).json({
      status: 0,
      msg: "Error procesando operación.",
    });
  }
};

usuarioCtrl.loginGoogle = async (req, res) => {
  const { token } = req.body;
  //Verificar token de Google
  try {
    const ticket = await cliente.verifyIdToken({
      idToken: token,
      audience:
        "494017255948-hr66km4if477k8fcavbm6k3bio5e9s8d.apps.googleusercontent.com",
    });
    //Obtiene todos los datos del usuario de Google
    const payload = ticket.getPayload();

    //Buscar usuario por email
    let usuario = await Usuario.findOne({ email: payload.email });

    if (!usuario) {
      //Google no da el password
      //Si no existe, crear usuario con password aleatorio
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

    //Generar token JWT para el usuario autenticado con Google
    const jwtToken = jwt.sign(
      { id: usuario._id },
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: "1h" }
    );

    res.status(200).json({
      userId: usuario._id,
      username: usuario.username,
      email: usuario.email,
      imagen: payload.picture,
      nombres: usuario.nombres,
      apellido: usuario.apellido,
      token: jwtToken,
    });
  } catch (error) {
    res.status(401).json({ msg: "Token de Google inválido" });
  }
};

usuarioCtrl.updateUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const datosActualizados = { ...req.body };

    //Verificar email (borrar en caso de que no se actualice el email)
    if (datosActualizados.email) {
      const emailRegistrado = await Usuario.findOne({
        email: datosActualizados.email,
        _id: { $ne: id },
      });
      if (emailRegistrado) {
        return res.json({
          status: 0,
          msg: "El email ya está registrado",
        });
      }
    }

    // Verificar username
    if (datosActualizados.username) {
      const usernameRegistrado = await Usuario.findOne({
        username: datosActualizados.username,
        _id: { $ne: id },
      });
      if (usernameRegistrado) {
        return res.json({
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
      return res.json({
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
    res.status(400).json({
      status: 0,
      msg: "Error procesando operación.",
      causa: error.message,
    });
  }
};

usuarioCtrl.deleteUsuario = async (req, res) => {
  try {
    const resultado = await Usuario.deleteOne({ _id: req.params.id });
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
    res.status(400).json({
      status: 0,
      msg: "Error procesando operación.",
      causa: error.message,
    });
  }
};

usuarioCtrl.getUsuariosByUsername = async (req, res) => {
  var usuarios = await Usuario.find({
    username: { $regex: req.params.username, $options: "i" },
  });
  res.status(200).json(usuarios);
};

module.exports = usuarioCtrl;
