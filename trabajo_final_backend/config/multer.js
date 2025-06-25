const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: (req, file) => {
    // Armar la ruta: productos/categoria/nombre-del-producto
    const categoria = req.body.categoria || "sin_categoria";
    const nombreProducto = req.body.nombre || "sin_nombre";
    return {
      folder: `productos/${categoria}/${nombreProducto}`,
      allowed_formats: ["jpg", "jpeg", "png", "webp"],
      public_id: Date.now() + "-" + file.originalname.replace(/\s/g, "_"),
    };
  },
});

const upload = multer({ storage });

module.exports = upload;