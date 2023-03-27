import mongoose from "mongoose";
import { MoviesType } from "../Interfaces/MoviesType";
import { moviesSchema } from "./Movies.schema";

export const MoviesModel = mongoose.model<MoviesType>('Movies', moviesSchema);
