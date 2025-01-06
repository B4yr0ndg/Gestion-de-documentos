"use strict";
// Importa el modulo 'express' para crear las rutas
import { Router } from "express";

/** Enrutador de usuarios  */
import userRoutes from "./user.routes.js";

/** Enrutador de autenticación */
import authRoutes from "./auth.routes.js";

/** Middleware de autenticación */
import authenticationMiddleware from "../middlewares/authentication.middleware.js";

/** Enrutador de documentos */
import documentRoutes from "./document.route.js";

// Importa el enrutador de trabajadores
import workerRoutes from "./worker.route.js";

// Importa el controlador de búsqueda combinada
import { searchAll } from "../controllers/search.controller.js";

/** Instancia del enrutador */
const router = Router();


// Define las rutas para los usuarios /api/usuarios
router.use("/users", authenticationMiddleware, userRoutes);
// Define las rutas para la autenticación /api/auth
router.use("/auth", authRoutes);
// Define las rutas para los documentos /api/documentos
router.use("/documents", documentRoutes);
// Define las rutas para los trabajadores /api/trabajadores
router.use("/workers", workerRoutes);

// Ruta para búsqueda combinada
router.get("/search", searchAll); // Agrega esta línea

// Exporta el enrutador
export default router;
