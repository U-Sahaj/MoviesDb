import mongoose from "mongoose";
import { DetailsType } from "../Interfaces/DetailsType";

export interface DetailsDocument extends DetailsType, Document {};

export const detailsSchema = new mongoose.Schema<DetailsDocument>({
    id: { type: String, required: true },
    original_language: { type: String, required: true },
});
  