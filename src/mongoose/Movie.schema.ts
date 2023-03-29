import mongoose from "mongoose";
import { MovieType } from "../Interfaces/MovieType";

export type MovieDocument = Document & MovieType;

export const MovieSchema = new mongoose.Schema<MovieDocument>({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  cast: [{ castId: Number, name: String }],
  crew: [{ crewId: Number, job: String, name: String }],
  original_language: { type: String, required: true },
});

