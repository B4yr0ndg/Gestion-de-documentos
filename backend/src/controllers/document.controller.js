"use strict";

import DocumentService from "../services/document.service.js";
import { respondSuccess, respondError } from "../utils/resHandler.js";
import { handleError } from "../utils/errorHandler.js";
import { documentBodySchema } from "../schema/document.schema.js";

/**
 * Sube un nuevo documento con archivo adjunto
 */
async function uploadDocument(req, res) {
  try {
    if (!req.file) return respondError(req, res, 400, "Archivo no proporcionado");

    const { error } = documentBodySchema.validate(req.body);
    if (error) return respondError(req, res, 400, error.details[0].message);

    const { title, description, type, expirationDate } = req.body;
    const uploadedBy = req.userId; // ID del usuario autenticado
    const fileUrl = `/uploads/${req.file.filename}`; // Ruta relativa del archivo cargado

    console.log("Controller uploadDocument - uploadedBy:", uploadedBy); // DEBUG

    // Llamar al servicio para guardar el documento
    const [newDocument, dbError] = await DocumentService.uploadDocument({
      title,
      description,
      type,
      fileUrl,
      expirationDate,
      uploadedBy, // Este campo debe estar presente
    });

    if (dbError) return respondError(req, res, 400, dbError);

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

    const [document, dbError] = await DocumentService.getDocument(req.params.id);

    if (dbError) return respondError(req, res, 404, dbError);

    respondSuccess(req, res, 200, document);
  } catch (error) {
    handleError(error, "document.controller -> getDocument");
    respondError(req, res, 500, "Error al obtener el documento");
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

    if (error) return respondError(req, res, 400, error);

    respondSuccess(req, res, 200, documents);
  } catch (error) {
    handleError(error, "document.controller -> searchDocuments");
    respondError(req, res, 500, "Error en la búsqueda de documentos");
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
  archiveDocument,
};
