import mongoose from "mongoose";
import { DetailsType } from "../Interfaces/DetailsType";

export const detailsSchema = new mongoose.Schema<DetailsType>({
    id: { type: String, required: true },
    original_language: { type: String, required: true },
});
  