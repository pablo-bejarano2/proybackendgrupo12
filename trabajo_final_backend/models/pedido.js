const mongoose = require("mongoose");
const { Schema } = mongoose;

const PedidoSchema = new Schema({
    cliente: { type: Schema.Types.ObjectId, ref: "Usuario", required: false },
    emailCliente: {
         type: String,
          validate: [
            { 
            validator: function(value){
                if(!this.cliente && !value) {
                    return false; 
                }
                return true;
            
            },
            message: "El email es obligatorio si no se proporciona un cliente.",
            },
            {
                validator: function(value) {
                    return /\S+@\S+\.\S+/.test(value);
                },
                message: "El email debe ser válido."
            }
        ]
    },
    fecha: { type: Date, default: Date.now },
    estado: { type: String, enum: ["pendiente", "enviado", "entregado", "cancelado"], default: "pendiente" },
    items: [{ type: Schema.Types.ObjectId, ref: "ItemPedido", required: true }],
    metodoPago: { type: String, enum: ["tarjeta", "efectivo", "transferencia", "qr"], required: true },
    direccion: { type: Schema.Types.ObjectId, ref: "Direccion", required: true },
    cupon: { type: Schema.Types.ObjectId, ref: "Cupon" },
    transportadora: { type: String, required: true },
    total: { type: Number, required: true },
    transportadora: { type: String , required: true },
    sucursalEnvio: { type: String, required: true },
});

module.exports = mongoose.models.Pedido || mongoose.model("Pedido", PedidoSchema);
