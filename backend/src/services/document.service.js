"use strict";
import Document from "../models/document.model.js";
import { handleError } from "../utils/errorHandler.js";

/**
 * Sube un nuevo documento
 * @param {Object} data - Datos del documento
 */
async function uploadDocument(data) {
  try {
    console.log("Service uploadDocument - data:", data); // DEBUG

    const newDocument = new Document(data); // Aquí `data` debe incluir `uploadedBy`
    await newDocument.save();
    return [newDocument, null];
  } catch (error) {
    handleError(error, "document.service -> uploadDocument");
    return [null, error.message || "No se pudo subir el documento"];
  }
}


/**
 * Obtiene un documento por su ID
 * @param {String} id - ID del documento
 */
async function getDocument(id) {
  try {
    const document = await Document.findById(id).exec();
    if (!document) return [null, "Documento no encontrado"];
    return [document, null];
  } catch (error) {
    handleError(error, "document.service -> getDocument");
    return [null, "Error al obtener el documento"];
  }
}

/**
 * Actualiza un documento por su ID
 * @param {String} id - ID del documento
 * @param {Object} data - Datos a actualizar
 */
async function updateDocument(id, data) {
  try {
    const updatedDocument = await Document.findByIdAndUpdate(id, data, { new: true }).exec();
    if (!updatedDocument) return [null, "Documento no encontrado"];
    return [updatedDocument, null];
  } catch (error) {
    handleError(error, "document.service -> updateDocument");
    return [null, "Error al actualizar el documento"];
  }
}

/**
 * Elimina un documento por su ID
 * @param {String} id - ID del documento
 */
async function deleteDocument(id) {
  try {
    const deletedDocument = await Document.findByIdAndDelete(id).exec();
    if (!deletedDocument) return [null, "Documento no encontrado"];
    return [deletedDocument, null];
  } catch (error) {
    handleError(error, "document.service -> deleteDocument");
    return [null, "Error al eliminar el documento"];
  }
}

/**
 * Realiza una búsqueda avanzada de documentos
 * @param {Object} filters - Filtros para la búsqueda
 */
async function searchDocuments(filters) {
  try {
    const { title, type, startDate, endDate, keywords, booleanOperator } = filters;

    const query = {};

    if (title) query.title = { $regex: title, $options: "i" };
    if (type) query.type = type;
    if (startDate || endDate) query.uploadDate = {};
    if (startDate) query.uploadDate.$gte = new Date(startDate);
    if (endDate) query.uploadDate.$lte = new Date(endDate);

    if (keywords) {
      const keywordArray = keywords.split(" ");
      // eslint-disable-next-line max-len
      const keywordQuery = keywordArray.map((keyword) => ({ description: { $regex: keyword, $options: "i" } }));

      if (booleanOperator === "AND") {
        query.$and = keywordQuery;
      } else if (booleanOperator === "OR") {
        query.$or = keywordQuery;
      } else if (booleanOperator === "NOT") {
        query.$nor = keywordQuery;
      }
    }

    const documents = await Document.find(query).exec();
    return [documents, null];
  } catch (error) {
    handleError(error, "document.service -> searchDocuments");
    return [null, "Error en la búsqueda de documentos"];
  }
}

/**
 * Archiva un documento por su ID
 * @param {String} id - ID del documento
 */
async function archiveDocument(id) {
  try {
    const document = await Document.findById(id).exec();
    if (!document) return [null, "Documento no encontrado"];

    document.archived = true;
    await document.save();

    return [document, null];
  } catch (error) {
    handleError(error, "document.service -> archiveDocument");
    return [null, "Error al archivar el documento"];
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

