"use strict";
import Worker from "../models/worker.model.js";
import { handleError } from "../utils/errorHandler.js";

/**
 * Crea un nuevo trabajador
 */
async function createWorker(data) {
  try {
    console.log("Intentando crear trabajador:", data); // Agregar este log
    const newWorker = new Worker(data);
    await newWorker.save();
    console.log("Trabajador creado exitosamente:", newWorker); // Log exitoso
    return [newWorker, null];
  } catch (error) {
    console.error("Error al crear trabajador:", error); // Log de error
    if (error.code === 11000) {
      return [null, `El número de identificación ya existe: ${data.identificationNumber}`];
    }
    handleError(error, "worker.service -> createWorker");
    return [null, "No se pudo crear el trabajador"];
  }
}


/**
 * Obtiene todos los trabajadores
 */
async function getWorkers() {
  try {
    const workers = await Worker.find().populate("documents").exec();
    return [workers, null];
  } catch (error) {
    handleError(error, "worker.service -> getWorkers");
    return [null, "Error al obtener los trabajadores"];
  }
}

/**
 * Obtiene un trabajador por ID
 */
async function getWorkerById(id) {
  try {
    const worker = await Worker.findById(id).populate("documents").exec();
    if (!worker) return [null, "Trabajador no encontrado"];
    return [worker, null];
  } catch (error) {
    handleError(error, "worker.service -> getWorkerById");
    return [null, "Error al obtener el trabajador"];
  }
}

/**
 * Actualiza un trabajador por ID
 */
async function updateWorker(id, data) {
  try {
    const updatedWorker = await Worker.findByIdAndUpdate(id, data, { new: true });
    if (!updatedWorker) return [null, "Trabajador no encontrado"];
    return [updatedWorker, null];
  } catch (error) {
    handleError(error, "worker.service -> updateWorker");
    return [null, "Error al actualizar el trabajador"];
  }
}

/**
 * Elimina un trabajador por ID
 */
async function deleteWorker(id) {
  try {
    const deletedWorker = await Worker.findByIdAndDelete(id);
    if (!deletedWorker) return [null, "Trabajador no encontrado"];
    return [deletedWorker, null];
  } catch (error) {
    handleError(error, "worker.service -> deleteWorker");
    return [null, "Error al eliminar el trabajador"];
  }
}

export default {
  createWorker,
  getWorkers,
  getWorkerById,
  updateWorker,
  deleteWorker,
};
