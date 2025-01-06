"use strict";
import Worker from "../models/worker.model.js";
import { handleError } from "../utils/errorHandler.js";
import Document from "../models/document.model.js";

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
    // eslint-disable-next-line max-len
    const worker = await Worker.findById(id).populate("documents").exec(); // Asegúrate de incluir "documents"
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

/**
 * Liga un documento a un trabajador
 */
async function linkDocumentToWorker(workerId, documentId) {
  try {
    const worker = await Worker.findById(workerId);
    if (!worker) return [null, "El trabajador no existe"];

    const document = await Document.findById(documentId);
    if (!document) return [null, "El documento no existe"];

    if (!worker.documents.includes(documentId)) {
      worker.documents.push(documentId);
      await worker.save();
    }

    document.worker = workerId;
    await document.save();

    return [worker, null];
  } catch (error) {
    handleError(error, "worker.service -> linkDocumentToWorker");
    return [null, "Error al ligar el documento al trabajador"];
  }
}


/**
 * Obtiene todos los trabajadores que no tienen un documento específico
 */
async function getWorkersWithoutDocument(documentId) {
  try {
    const workers = await Worker.find({
      documents: { $ne: documentId },
    });
    return [workers, null];
  } catch (error) {
    return [null, error.message];
  }
}

/**
 * Realiza una búsqueda avanzada de trabajadores
 * @param {Object} filters - Filtros para la búsqueda
 */
async function searchWorkers({ name, keywords }) {
  try {
    const query = {};

    // Filtrar por nombre exacto o parcial
    if (name) {
      query.name = { $regex: new RegExp(name, "i") }; // "i" para insensible a mayúsculas/minúsculas
    }

    // Filtrar por palabras clave en nombre o identificación
    if (keywords) {
      const keywordRegex = new RegExp(keywords, "i");
      query.$or = [
        { name: keywordRegex },
        { position: keywordRegex },
        { identificationNumber: keywordRegex },
      ];
    }

    const workers = await Worker.find(query).exec();

    return [workers, null];
  } catch (error) {
    handleError(error, "worker.service -> searchWorkers");
    return [null, "Error en la búsqueda avanzada de trabajadores"];
  }
}

/**
 * Realiza una búsqueda combinada de trabajadores y documentos
 */
async function searchAll(query) {
  try {
    const regexQuery = { $regex: query, $options: "i" };

    const documents = await Document.find({
      $or: [
        { title: regexQuery },
        { description: regexQuery },
        { type: regexQuery },
      ],
    }).exec();

    const workers = await Worker.find({
      $or: [
        { name: regexQuery },
        { position: regexQuery },
        { identificationNumber: regexQuery },
      ],
    }).exec();

    return [{ documents, workers }, null];
  } catch (error) {
    handleError(error, "worker.service -> searchAll");
    return [null, "Error en la búsqueda combinada"];
  }
}


export default {
  createWorker,
  getWorkers,
  getWorkerById,
  updateWorker,
  deleteWorker,
  linkDocumentToWorker,
  getWorkersWithoutDocument,
  searchWorkers, // Función de búsqueda avanzada
  searchAll,
};
