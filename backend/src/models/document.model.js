/* eslint-disable max-len */
"use strict";
import { Schema, model } from "mongoose";

const documentSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    type: { type: String, required: true },
    uploadDate: { type: Date, default: Date.now },
    uploadedBy: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Relación con el usuario
    fileUrl: { type: String, required: true },
    expirationDate: { type: Date },
    archived: { type: Boolean, default: false },
  },
  {
    versionKey: false,
  },
);

const Document = model("Document", documentSchema);

export default Document;
