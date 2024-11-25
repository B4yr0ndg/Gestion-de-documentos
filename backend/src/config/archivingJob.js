"use strict";
import cron from "node-cron";
import DocumentService from "../services/document.service.js";

/**
 * Configura un trabajo de cron que archiva documentos vencidos cada semana
 */
cron.schedule("0 0 * * 0", async () => {
  console.log("Iniciando archivado automático de documentos vencidos");

  const [archivedDocuments, error] = await DocumentService.archiveExpiredDocuments();

  if (error) console.error("Error en el archivado automático:", error);
  // eslint-disable-next-line max-len
  else console.log("Archivado automático completado:", archivedDocuments.length, "documentos archivados");
});

