"use strict";

import { Schema, model } from "mongoose";

const workerSchema = new Schema(
  {
    name: { type: String, required: true },
    identificationNumber: { type: String, unique: true, required: true },
    position: { type: String, required: true },
    documents: [{ type: Schema.Types.ObjectId, ref: "Document" }], // Relación con Document
  },
  { timestamps: true },
);


const Worker = model("Worker", workerSchema);

export default Worker;

