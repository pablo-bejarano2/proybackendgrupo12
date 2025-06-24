const mongoose = require("mongoose");
const { Schema } = mongoose;

const PedidoSchema = new Schema({
    //cliente: { type: Schema.Types.ObjectId, ref: "Cliente", required: false },
    fecha: { type: Date, default: Date.now },
    estado: { type: String, enum: ["pendiente", "enviado", "entregado", "cancelado"], default: "pendiente" },
    items: [{ type: Schema.Types.ObjectId, ref: "ItemPedido", required: true }],
    metodoPago: { type: String, enum: ["tarjeta", "efectivo", "transferencia"], required: true },
    direccion: { type: Schema.Types.ObjectId, ref: "Direccion", required: true },
    cupon: { type: Schema.Types.ObjectId, ref: "Cupon" },
    total: { type: Number, required: true },
});

module.exports = mongoose.models.Pedido || mongoose.model("Pedido", PedidoSchema);
