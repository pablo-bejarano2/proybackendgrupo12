// ---------------------------------------------
// Módulos requeridos
// ---------------------------------------------
const express = require("express");
const cors = require("cors");

// Conexión a la base de datos MongoDB
const { mongoose } = require("./database");

// ---------------------------------------------
// Inicialización de la aplicación Express
// ---------------------------------------------
var app = express();

// ---------------------------------------------
// Configuración de middlewares
// ---------------------------------------------

// Permite recibir y procesar datos en formato JSON
app.use(express.json());

// Habilita CORS solo para el frontend en localhost:4200
app.use(cors({ origin: "http://localhost:4200" }));

// ---------------------------------------------
// Rutas del proyecto
// ---------------------------------------------
// Ej. app.use('/api/agente', require('./routes/agente.route.js'));
app.use("/api/categoria", require("./routes/categoria.route"));
app.use("/api/producto", require("./routes/producto.route"));
app.use("/api/direccion", require("./routes/direccion.route.js"));
app.use("/api/cupon", require("./routes/cupon.route.js"));
app.use("/api/itemPedido", require("./routes/itemPedido.route.js"));

// ---------------------------------------------
// Configuración del puerto del servidor
// --------------------------------------------
app.set("port", process.env.PORT || 3000);

// ---------------------------------------------
// Inicio del servidor
// ---------------------------------------------
app.listen(app.get("port"), () => {
  console.log(`Servidor iniciado en el puerto `, app.get("port"));
});
