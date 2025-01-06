"use strict";
import { Router } from "express";
import workerController from "../controllers/worker.controller.js";
import { isAdmin } from "../middlewares/authorization.middleware.js";
import verifyJWT from "../middlewares/authentication.middleware.js";

const router = Router();

router.use(verifyJWT); // Requiere autenticación para todas las rutas

// eslint-disable-next-line max-len
router.post("/link-document", isAdmin, workerController.linkDocument); // Ligar un documento a un trabajador
// eslint-disable-next-line max-len
router.get("/without-document/:documentId", verifyJWT, workerController.getWorkersWithoutDocument); // Obtener trabajadores sin documento
router.post("/", isAdmin, workerController.createWorker); // Crear un trabajador
router.get("/", workerController.getWorkers); // Obtener todos los trabajadores
router.get("/:id", workerController.getWorkerById); // Obtener un trabajador por ID
router.put("/:id", isAdmin, workerController.updateWorker); // Actualizar un trabajador por ID
router.delete("/:id", isAdmin, workerController.deleteWorker); // Eliminar un trabajador por ID


export default router;
