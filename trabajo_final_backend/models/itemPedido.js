const mongoose = require("mongoose");
const { Schema } = mongoose;

const ItemPedidoSchema = new Schema({
    cantidad: { type: Number, required: true },
    subtotal: { type: Number},
    producto: { type: Schema.Types.ObjectId, ref: "Producto", required: true },
    talla: { type: String, required: true },
});

module.exports = mongoose.models.ItemPedido || mongoose.model("ItemPedido", ItemPedidoSchema);
