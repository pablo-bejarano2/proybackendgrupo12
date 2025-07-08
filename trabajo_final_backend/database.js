const mongoose = require("mongoose");

const URI = "mongodb+srv://44516075:L2aWiov3OwOYam5N@tp-final.yvs3gyd.mongodb.net/?retryWrites=true&w=majority&appName=tp-final";

mongoose
  .connect(URI)
  .then((db) => console.log("Base de datos conectada con éxito"))
  .catch((err) => console.error("Error al conectar la base de datos:", err));

module.exports = mongoose;
