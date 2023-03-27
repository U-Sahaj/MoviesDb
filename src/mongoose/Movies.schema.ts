import mongoose from "mongoose";
import { MoviesType } from "../Interfaces/MoviesType";

export const moviesSchema = new mongoose.Schema<MoviesType>({
    id: { type: String, required: true },
    original_language: { type: String, required: true },
});
  