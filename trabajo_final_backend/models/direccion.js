const mongoose = require("mongoose");
const {Schema} = mongoose;

const direccionSchema = new Schema({
  calle: { type: String, required: true },
  ciudad: { type: String, required: true },
  provincia: { type: String, required: true },
  codigoPostal: { type: String, required: true },
  transportadora: { type: String , required: true },
  sucursalEnvio: { type: String, default: true },
});

module.exports = mongoose.model("Direccion", direccionSchema);
