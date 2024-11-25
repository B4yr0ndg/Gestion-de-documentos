"use strict";

import multer from "multer";
import path from "path";

// Configuración de almacenamiento para multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Carpeta donde se almacenarán los archivos
  },
  filename: (req, file, cb) => {
    // eslint-disable-next-line no-unused-vars
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Filtros de archivos (solo permitir ciertos tipos)
// eslint-disable-next-line require-jsdoc
const fileFilter = (req, file, cb) => {
  console.log("Archivo recibido por multer:", file); // Verifica si el archivo está siendo detectado
  const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Tipo de archivo no permitido. Solo se permiten PDF, JPEG y PNG."));
  }
};

// Configuración final de multer
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // Límite de 5MB
});

export default upload;
