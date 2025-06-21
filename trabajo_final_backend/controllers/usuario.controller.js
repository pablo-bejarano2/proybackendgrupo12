const usuario = require("./../models/usuario");
const Usuario = require("./../models/usuario");

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
      perfil: usuario.rol,
      userid: usuario._id,
    });
  } catch (error) {
    res.json({
      status: 0,
      msg: "Error procesando operacion.",
    });
  }
};

module.exports = usuarioCtrl;
