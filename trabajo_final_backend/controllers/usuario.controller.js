const usuario = require("./../models/usuario");
const Usuario = require("./../models/usuario");

const { OAuth2Client } = require("google-auth-library");
const cliente = new OAuth2Client(
  "494017255948-hr66km4if477k8fcavbm6k3bio5e9s8d.apps.googleusercontent.com"
);
const usuarioCtrl = {};

const bcrypt = require("bcrypt");

usuarioCtrl.createUsuario = async (req, res) => {
  try {
    // Encriptar la contraseña antes de guardar
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    //Crear usuario con el password encriptado
    const usuario = new Usuario({
      ...req.body,
      password: hashedPassword,
    });

    console.log(usuario);

    await usuario.save();
    res.status(200).json({
      status: "1",
      msg: "Usuario guardado correctamente",
    });
  } catch (error) {
    res.status(400).json({
      status: "0",
      msg: "Error procesando operacion.",
      causa: error.message,
    });
  }
};

usuarioCtrl.getUsuarios = async (req, res) => {
  var usuarios = await Usuario.find();
  res.status(200).json(usuarios);
};

usuarioCtrl.loginUsuario = async (req, res) => {
  try {
    const { username, password } = req.body;
    //findOne retorna un objeto que cumpla con los criterios de busqueda
    const usuario = await Usuario.findOne({ username });

    if (!usuario) {
      res.json({
        status: 0,
        msg: "Usuario no encontrado",
      });
    }

    //Comparamos el password enviado con el almacenado
    const match = await bcrypt.compare(password, usuario.password);

    if (!match) {
      return res.json({
        status: 0,
        msg: "Contraseña incorrecta",
      });
    }

    res.json({
      status: 1,
      msg: "Login exitoso",
      username: usuario.username,
      rol: usuario.rol,
      userid: usuario._id,
    });
  } catch (error) {
    res.json({
      status: 0,
      msg: "Error procesando operacion.",
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
    const payload = ticket.getPayload();

    // Buscar usuario por email
    let usuario = await Usuario.findOne({ email: payload.email });
    console.log(usuario);
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
    console.log(payload); //para pruebas
    res.status(200).json({
      nombre: payload.name,
      email: payload.email,
      imagen: payload.picture,
    });
  } catch (error) {
    res.status(401).json({ msg: "Token de Google inválido" });
  }
};

module.exports = usuarioCtrl;
