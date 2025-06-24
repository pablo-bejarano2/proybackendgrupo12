const mongoose = require('mongoose');
const {Schema} =mongoose;
const cuponSchema = new Schema({
    codigo: { type: String, required: true, unique: true },
    descuento: { type: Number, required: true },
    fechaExpiracion: { type: Date, required: true },
    activo: { type: Boolean, default: true }
}, {
    timestamps: true
});
const Cupon = mongoose.model('Cupon', cuponSchema);
module.exports = Cupon;