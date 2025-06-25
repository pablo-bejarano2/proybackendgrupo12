const mongoose = require("mongoose");
const { Schema } = mongoose;

const TallaSchema = new Schema({
    talla: { type: String, required: true }, // Ej: "S", "M", "L", "38", "39"
    stock: { type: Number, required: true }
}, { _id: false });

const ProductoSchema = new Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    precio: { type: Number, required: true },
    color: { type: String, required: true },
    imagenes: [{ type: String}], // Array de URLs de imágenes
    tallas: [TallaSchema], // Array de tallas con stock
    categoria: { type: Schema.Types.ObjectId, ref: "Categoria", required: true },
});

module.exports = mongoose.models.Producto || mongoose.model("Producto", ProductoSchema);

