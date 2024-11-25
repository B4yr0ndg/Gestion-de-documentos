"use strict";
import { Router } from "express";
import workerController from "../controllers/worker.controller.js";
import { isAdmin } from "../middlewares/authorization.middleware.js";
import verifyJWT from "../middlewares/authentication.middleware.js";

const router = Router();

router.use(verifyJWT); // Requiere autenticación para todas las rutas

router.post("/", isAdmin, workerController.createWorker);
router.get("/", workerController.getWorkers);
router.get("/:id", workerController.getWorkerById);
router.put("/:id", isAdmin, workerController.updateWorker);
router.delete("/:id", isAdmin, workerController.deleteWorker);

export default router;
