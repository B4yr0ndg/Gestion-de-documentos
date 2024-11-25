"use strict";
import crypto from "crypto";

/**
 * Genera una firma digital para un documento
 * @param {Object} document - Documento a firmar
 * @param {String} userId - ID del usuario que firma
 */
async function addDigitalSignature(document, userId) {
  const signatureData = `${document._id}-${userId}-${new Date().toISOString()}`;
  const signature = crypto.createHash("sha256").update(signatureData).digest("hex");
  return signature;
}

export { addDigitalSignature };
