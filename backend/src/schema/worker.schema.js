"use strict";
import Joi from "joi";

/**
 * Esquema de validación para crear o actualizar trabajadores.
 */
const workerBodySchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "El nombre no puede estar vacío.",
    "any.required": "El nombre es obligatorio.",
  }),
  identificationNumber: Joi.string().required().messages({
    "string.empty": "El número de identificación no puede estar vacío.",
    "any.required": "El número de identificación es obligatorio.",
  }),
  position: Joi.string().required().messages({
    "string.empty": "El cargo no puede estar vacío.",
    "any.required": "El cargo es obligatorio.",
  }),
  documents: Joi.array()
    .items(Joi.string().pattern(/^[0-9a-fA-F]{24}$/))
    .optional()
    .messages({
      "array.base": "Los documentos deben ser un arreglo de IDs válidos.",
      "string.pattern.base": "Cada ID de documento debe ser un ObjectId válido.",
    }),
}).messages({
  "object.unknown": "No se permiten propiedades adicionales.",
});

/**
 * Esquema de validación para el ID de trabajador.
 */
const workerIdSchema = Joi.object({
  id: Joi.string().required().pattern(/^[0-9a-fA-F]{24}$/).messages({
    "string.empty": "El ID no puede estar vacío.",
    "any.required": "El ID es obligatorio.",
    "string.pattern.base": "El ID proporcionado no es válido.",
  }),
});

export { workerBodySchema, workerIdSchema };
