/* eslint-disable max-len */
"use strict";

import { Router } from "express";
import documentController from "../controllers/document.controller.js";
import upload from "../middlewares/upload.middleware.js";
import { isAdmin } from "../middlewares/authorization.middleware.js";
import verifyJWT from "../middlewares/authentication.middleware.js";

const router = Router();

// Middleware para verificar autenticación
router.use(verifyJWT);

// Rutas de busqueda avanzada
router.get("/search", documentController.searchDocuments); // Buscar documentos
router.get("/searchAll", documentController.searchAll);

// Rutas de documentos
router.post("/", isAdmin, upload.single("file"), documentController.uploadDocument); // Subir un documento con archivo
router.get("/:id", documentController.getDocument); // Obtener un documento por ID
router.put("/:id", isAdmin, documentController.updateDocument); // Actualizar un documento por ID
router.delete("/:id", isAdmin, documentController.deleteDocument); // Eliminar un documento por ID
router.put("/:id/archive", isAdmin, documentController.archiveDocument); // Archivar un documento por ID


export default router;

