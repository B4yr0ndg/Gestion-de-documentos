"use strict";

import Joi from "joi";

/**
 * Esquema de validación para crear o actualizar documentos
 */
const documentBodySchema = Joi.object({
  title: Joi.string().required().messages({
    "string.empty": "El título no puede estar vacío.",
    "any.required": "El título es obligatorio.",
  }),
  description: Joi.string().allow("").messages({
    "string.base": "La descripción debe ser de tipo string.",
  }),
  type: Joi.string().required().messages({
    "string.empty": "El tipo de documento no puede estar vacío.",
    "any.required": "El tipo de documento es obligatorio.",
  }),
  expirationDate: Joi.date().optional().messages({
    "date.base": "La fecha de expiración debe ser una fecha válida.",
  }),
}).messages({
  "object.unknown": "No se permiten propiedades adicionales.",
});

/**
 * Esquema de validación para el ID del documento
 */
const documentIdSchema = Joi.object({
  id: Joi.string().required().pattern(/^[0-9a-fA-F]{24}$/).messages({
    "string.empty": "El ID no puede estar vacío.",
    "any.required": "El ID es obligatorio.",
    "string.pattern.base": "El ID proporcionado no es válido.",
  }),
});

export { documentBodySchema, documentIdSchema };

