"use strict";
import { Schema, model } from "mongoose";

const workerSchema = new Schema(
  {
    name: { type: String, required: true },
    identificationNumber: { type: String, required: true, unique: true },
    position: { type: String, required: true },
    documents: [
      {
        type: Schema.Types.ObjectId,
        ref: "Document",
      },
    ], // Lista de documentos asociados al trabajador
  },
  {
    versionKey: false,
  },
);

const Worker = model("Worker", workerSchema);

export default Worker;
