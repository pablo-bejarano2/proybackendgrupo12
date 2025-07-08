// ---------------------------------------------
// Módulos requeridos
// ---------------------------------------------
const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger_output.json");

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
app.use(
  cors({
    origin: ["http://localhost:4200", "https://proyfrontendgrupo12.onrender.com"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ---------------------------------------------
// Rutas del proyecto
// ---------------------------------------------
// Ej. app.use('/api/agente', require('./routes/agente.route.js'));
app.use("/api/categoria", require("./routes/categoria.route"));
app.use("/api/producto", require("./routes/producto.route.js"));
app.use("/api/direccion", require("./routes/direccion.route.js"));
app.use("/api/cupon", require("./routes/cupon.route.js"));
app.use("/api/itemPedido", require("./routes/itemPedido.route.js"));
app.use("/api/pedido", require("./routes/pedido.route.js"));
app.use("/api/usuario", require("./routes/usuario.route.js"));

app.use("/api/mp", require("./routes/mp.route.js"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use("/api/dashboard", require("./routes/dashboard.route.js"));
app.use('/api/codigoPostal', require("./routes/codigoPostal.route"));
// ---------------------------------------------
// Configuración del puerto del servidor
// --------------------------------------------
app.set("port", process.env.PORT || 3000);

// ---------------------------------------------
// Inicio del servidor
// ---------------------------------------------
app.listen(app.get("port"), () => {
  console.log(`Servidor iniciado en el puerto `, app.get("port"));
  console.log(
    `Documentación de la API disponible en http://localhost:${app.get(
      "port"
    )}/api-docs`
  );
});
