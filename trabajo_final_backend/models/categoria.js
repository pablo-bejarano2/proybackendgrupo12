const mongoose = require("mongoose");

const { Schema } = mongoose;

const CategoriaSchema = new Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
});

module.exports =
  mongoose.models.Categoria || mongoose.model("Categoria", CategoriaSchema);
