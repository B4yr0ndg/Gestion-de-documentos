/* eslint-disable max-len */
"use strict";

import WorkerService from "../services/worker.service.js";
import DocumentService from "../services/document.service.js";
import { respondSuccess, respondError } from "../utils/resHandler.js";
import { handleError } from "../utils/errorHandler.js";

/**
 * Realiza la búsqueda combinada de trabajadores y documentos
 */
export async function searchAll(req, res) {
  try {
    const query = req.query.query; // Obtén el término de búsqueda desde los parámetros

    if (!query) {
      return respondError(req, res, 400, "No se proporcionó un término de búsqueda");
    }

    // Realizar la búsqueda de trabajadores y documentos
    const [workers, workersError] = await WorkerService.searchWorkers({ name: query, keywords: query });
    const [documents, documentsError] = await DocumentService.searchDocuments({ title: query, keywords: query });

    if (workersError || documentsError) {
      return respondError(
        req,
        res,
        500,
        workersError || documentsError || "Error al realizar la búsqueda combinada",
      );
    }

    // Combinar resultados y devolverlos
    const results = {
      workers: workers || [],
      documents: documents || [],
    };

    respondSuccess(req, res, 200, results);
  } catch (error) {
    handleError(error, "search.controller -> searchAll");
    respondError(req, res, 500, "Error al realizar la búsqueda combinada");
  }
}
