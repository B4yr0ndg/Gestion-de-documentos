"use strict";
import Document from "../models/document.model.js";
import Worker from "../models/worker.model.js";
import { handleError } from "../utils/errorHandler.js";

/**
 * Sube un nuevo documento
 */
async function uploadDocument(data) {
  try {
    const newDocument = new Document(data); // Crea el documento con los datos proporcionados
    await newDocument.save(); // Guarda el documento en la base de datos
    return [newDocument, null];
  } catch (error) {
    handleError(error, "document.service -> uploadDocument");
    return [null, error.message || "No se pudo subir el documento"];
  }
}


/**
 * Obtiene un documento por su ID
 */
async function getDocument(id) {
  try {
    const document = await Document.findById(id).populate("uploadedBy").exec();
    if (!document) return [null, "Documento no encontrado"];
    return [document, null];
  } catch (error) {
    handleError(error, "document.service -> getDocument");
    return [null, "Error al obtener el documento"];
  }
}

/**
 * Actualiza un documento por su ID
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
 */
async function searchDocuments({ title, type, startDate, endDate, keywords }) {
  try {
    const query = {};

    if (title) query.title = { $regex: title, $options: "i" };
    if (type) query.type = type;
    if (startDate && endDate) {
      query.uploadDate = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }
    if (keywords) {
      const keywordRegex = new RegExp(keywords, "i");
      query.$or = [
        { title: { $regex: keywordRegex } },
        { description: { $regex: keywordRegex } },
      ];
    }

    const documents = await Document.find(query).exec();
    return [documents, null];
  } catch (error) {
    handleError(error, "document.service -> searchDocuments");
    return [null, "Error en la búsqueda avanzada"];
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
    handleError(error, "document.service -> searchAll");
    return [null, "Error en la búsqueda combinada"];
  }
}

/**
 * Archiva un documento por su ID
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
  searchAll, // Nueva función de búsqueda combinada
  archiveDocument,
};
