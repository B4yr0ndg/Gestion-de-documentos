/* eslint-disable require-jsdoc */
"use strict";

import DocumentService from "../services/document.service.js";
import WorkerService from "../services/worker.service.js";
import { respondSuccess, respondError } from "../utils/resHandler.js";
import { handleError } from "../utils/errorHandler.js";
import { documentBodySchema, documentIdSchema } from "../schema/document.schema.js";
import Document from "../models/document.model.js";
// import Worker from "../models/worker.model.js"; // Importa el modelo Worker


/**
 * Sube un nuevo documento con archivo adjunto y lo asocia a un trabajador
 */

async function uploadDocument(req, res) {
  try {
    if (!req.file) {
      return respondError(req, res, 400, "Archivo no proporcionado");
    }

    const { title, description, type, expirationDate, worker } = req.body;

    const fileUrl = `/uploads/${req.file.filename}`;

    // Crea el documento
    const documentData = {
      title,
      description,
      type,
      expirationDate,
      fileUrl,
      uploadedBy: req.userId,
      worker, // Asegúrate de que worker sea el ID del trabajador
    };

    const [newDocument, dbError] = await DocumentService.uploadDocument(documentData);
    if (dbError) return respondError(req, res, 400, dbError);

    // Si se proporciona un trabajador, actualiza su lista de documentos
    if (worker) {
      // eslint-disable-next-line max-len, no-unused-vars
      const [updatedWorker, workerError] = await WorkerService.linkDocumentToWorker(worker, newDocument._id);
      if (workerError) return respondError(req, res, 400, workerError);
    }

    respondSuccess(req, res, 201, newDocument);
  } catch (error) {
    handleError(error, "document.controller -> uploadDocument");
    respondError(req, res, 500, "Error al subir el documento");
  }
}

/**
 * Obtiene un documento por su ID
 */
async function getDocument(req, res) {
  try {
    const { error } = documentIdSchema.validate(req.params);
    if (error) return respondError(req, res, 400, error.details[0].message);

    // Buscar documento con información del trabajador asociado
    const document = await Document.findById(req.params.id).populate("worker").exec();
    if (!document) return respondError(req, res, 404, "Documento no encontrado");

    respondSuccess(req, res, 200, document);
  } catch (error) {
    handleError(error, "document.controller -> getDocument");
    respondError(req, res, 500, error.message || "Error al obtener el documento");
  }
}


/**
 * Actualiza un documento por su ID
 */
async function updateDocument(req, res) {
  try {
    const { error: idError } = documentIdSchema.validate(req.params);
    if (idError) return respondError(req, res, 400, idError.details[0].message);

    const { error: bodyError } = documentBodySchema.validate(req.body);
    if (bodyError) return respondError(req, res, 400, bodyError.details[0].message);

    const { title, description, type, expirationDate } = req.body;

    const [updatedDocument, dbError] = await DocumentService.updateDocument(req.params.id, {
      title,
      description,
      type,
      expirationDate,
    });

    if (dbError) return respondError(req, res, 400, dbError);

    respondSuccess(req, res, 200, updatedDocument);
  } catch (error) {
    handleError(error, "document.controller -> updateDocument");
    respondError(req, res, 500, "Error al actualizar el documento");
  }
}

/**
 * Elimina un documento por su ID
 */
async function deleteDocument(req, res) {
  try {
    const { error } = documentIdSchema.validate(req.params);
    if (error) return respondError(req, res, 400, error.details[0].message);

    const [deletedDocument, dbError] = await DocumentService.deleteDocument(req.params.id);

    if (dbError) return respondError(req, res, 404, dbError);

    respondSuccess(req, res, 200, deletedDocument);
  } catch (error) {
    handleError(error, "document.controller -> deleteDocument");
    respondError(req, res, 500, "Error al eliminar el documento");
  }
}

/**
 * Realiza una búsqueda avanzada de documentos
 */
async function searchDocuments(req, res) {
  try {
    const { title, type, startDate, endDate, keywords, booleanOperator } = req.query;

    const [documents, error] = await DocumentService.searchDocuments({
      title,
      type,
      startDate,
      endDate,
      keywords,
      booleanOperator,
    });

    if (error) {
      return respondError(req, res, 400, error);
    }

    respondSuccess(req, res, 200, documents);
  } catch (error) {
    handleError(error, "document.controller -> searchDocuments");
    respondError(req, res, 500, "Error en la búsqueda de documentos");
  }
}

/**
 * Realiza una búsqueda combinada de documentos y trabajadores
 */
async function searchAll(req, res) {
  try {
    const { query } = req.query;

    if (!query) return respondError(req, res, 400, "La consulta no puede estar vacía");

    // Buscar en documentos
    const [documents, docError] = await DocumentService.searchDocuments({
      title: query,
      description: query,
    });

    // Buscar en trabajadores
    const [workers, workerError] = await WorkerService.searchWorkers({ query });

    if (docError || workerError) {
      return respondError(req, res, 500, "Error en la búsqueda combinada");
    }

    respondSuccess(req, res, 200, { documents, workers });
  } catch (error) {
    handleError(error, "document.controller -> searchAll");
    respondError(req, res, 500, "Error en la búsqueda combinada");
  }
}

/**
 * Archiva un documento por su ID
 */
async function archiveDocument(req, res) {
  try {
    const { error } = documentIdSchema.validate(req.params);
    if (error) return respondError(req, res, 400, error.details[0].message);

    const [archivedDocument, dbError] = await DocumentService.archiveDocument(req.params.id);

    if (dbError) return respondError(req, res, 404, dbError);

    respondSuccess(req, res, 200, archivedDocument);
  } catch (error) {
    handleError(error, "document.controller -> archiveDocument");
    respondError(req, res, 500, "Error al archivar el documento");
  }
}

export default {
  uploadDocument,
  getDocument,
  updateDocument,
  deleteDocument,
  searchDocuments,
  searchAll, // Añadida nueva función
  archiveDocument,
};
