"use strict";

import WorkerService from "../services/worker.service.js";
import { respondSuccess, respondError } from "../utils/resHandler.js";
import { handleError } from "../utils/errorHandler.js";
import { workerBodySchema, workerIdSchema } from "../schema/worker.schema.js";

/**
 * Crea un nuevo trabajador
 */
async function createWorker(req, res) {
  try {
    console.log("Datos recibidos:", req.body); // Agregar este log

    const { name, identificationNumber, position, documents } = req.body;
    const { error } = workerBodySchema.validate(req.body);
    if (error) return respondError(req, res, 400, error.details[0].message);

    const [newWorker, dbError] = await WorkerService.createWorker({
      name,
      identificationNumber,
      position,
      documents,
    });

    if (dbError) return respondError(req, res, 400, dbError);

    respondSuccess(req, res, 201, newWorker);
  } catch (error) {
    handleError(error, "worker.controller -> createWorker");
    respondError(req, res, 500, "Error al crear el trabajador");
  }
}

/**
 * Obtiene todos los trabajadores
 */
async function getWorkers(req, res) {
  try {
    const [workers, error] = await WorkerService.getWorkers();
    if (error) return respondError(req, res, 404, error);

    respondSuccess(req, res, 200, workers);
  } catch (error) {
    handleError(error, "worker.controller -> getWorkers");
    respondError(req, res, 500, "Error al obtener los trabajadores");
  }
}

/**
 * Obtiene un trabajador por ID
 */
async function getWorkerById(req, res) {
  try {
    const { error } = workerIdSchema.validate(req.params);
    if (error) return respondError(req, res, 400, error.details[0].message);

    const [worker, dbError] = await WorkerService.getWorkerById(req.params.id);

    if (dbError) return respondError(req, res, 404, dbError);

    respondSuccess(req, res, 200, worker);
  } catch (error) {
    handleError(error, "worker.controller -> getWorkerById");
    respondError(req, res, 500, "Error al obtener el trabajador");
  }
}
/**
 * Actualiza un trabajador por ID
 */
async function updateWorker(req, res) {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const [updatedWorker, error] = await WorkerService.updateWorker(id, updateData);
    if (error) return respondError(req, res, 400, error);

    respondSuccess(req, res, 200, updatedWorker);
  } catch (error) {
    handleError(error, "worker.controller -> updateWorker");
    respondError(req, res, 500, "Error al actualizar el trabajador");
  }
}

/**
 * Elimina un trabajador por ID
 */
async function deleteWorker(req, res) {
  try {
    const { id } = req.params;
    const [deletedWorker, error] = await WorkerService.deleteWorker(id);
    if (error) return respondError(req, res, 404, error);

    respondSuccess(req, res, 200, deletedWorker);
  } catch (error) {
    handleError(error, "worker.controller -> deleteWorker");
    respondError(req, res, 500, "Error al eliminar el trabajador");
  }
}

export default {
  createWorker,
  getWorkers,
  getWorkerById,
  updateWorker,
  deleteWorker,
};
