const mongoose = require("mongoose");

const URI = "mongodb://localhost/tiendaonlineDB";

mongoose
  .connect(URI)
  .then((db) => console.log("Base de datos conectada con éxito"))
  .catch((err) => console.error("Error al conectar la base de datos:", err));

module.exports = mongoose;
