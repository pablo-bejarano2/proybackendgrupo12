const mongoose = require('mongoose');
const {Schema} =mongoose;
const cuponSchema = new Schema({
    codigo: { type: String, required: true, unique: true },
    nombre: { type: String, required: true },
    descuento: { type: Number, required: true },
    fechaExpiracion: { type: Date, required: true },
    usosMaximos: { type: Number, required: true },
    usosRestantes: { type: Number, required: true,
        default: function() {
            return this.usosMaximos;
        }
     },
    activo: { type: Boolean, default: true }
}, {
    timestamps: true
});
const Cupon = mongoose.model('Cupon', cuponSchema);
module.exports = Cupon;