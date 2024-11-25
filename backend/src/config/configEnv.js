"use strict";

import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

// Obtener la ruta del archivo actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Establece la ruta absoluta del archivo .env
const envFilePath = path.resolve(__dirname, "../../.env");

// Cargar las variables de entorno desde el archivo .env
dotenv.config({ path: envFilePath });

/** Server port */
export const PORT = process.env.PORT;
/** Server host */
export const HOST = process.env.HOST;
/** Database URL */
export const DB_URL = process.env.DB_URL;
/** Access token secret */
export const ACCESS_JWT_SECRET = process.env.ACCESS_JWT_SECRET;
/** Refresh token secret */
export const REFRESH_JWT_SECRET = process.env.REFRESH_JWT_SECRET;

console.log("DB_URL:", process.env.DB_URL); // Agregar esta línea para verificar

