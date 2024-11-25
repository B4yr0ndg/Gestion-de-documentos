"use strict";

import jwt from "jsonwebtoken";
import { ACCESS_JWT_SECRET } from "../config/configEnv.js";
import { respondError } from "../utils/resHandler.js";
import { handleError } from "../utils/errorHandler.js";

/**
 * Verifica el token de acceso
 */
const verifyJWT = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      return respondError(req, res, 401, "No autorizado", "No hay token valido");
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, ACCESS_JWT_SECRET, (err, decoded) => {
      if (err) return respondError(req, res, 403, "No autorizado", err.message);

      // Establecer el userId desde el token decodificado
      req.userId = decoded.id; // ID del usuario que sube el documento
      req.email = decoded.email;
      req.roles = decoded.roles;

      console.log("Middleware verifyJWT - req.userId:", req.userId); // DEBUG
      next();
    });
  } catch (error) {
    handleError(error, "authentication.middleware -> verifyJWT");
    respondError(req, res, 500, "Error en la autenticación");
  }
};

export default verifyJWT;
