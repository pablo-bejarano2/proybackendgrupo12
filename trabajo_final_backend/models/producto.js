const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProductoSchema = new Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    precio: { type: Number, required: true },
    stock: { type: Number, required: true },
    color: { type: String, required: true },
    imagenUrl: { type: String, required: false },
    categoria: { type: Schema.Types.ObjectId, ref: "Categoria", required: true },
});

module.exports = mongoose.models.Producto || mongoose.model("Producto", ProductoSchema);

