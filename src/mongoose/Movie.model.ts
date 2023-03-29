import mongoose from "mongoose";
import { MovieDocument, MovieSchema } from "./Movie.schema";

const MovieModel: mongoose.Model<MovieDocument> = mongoose.model("Movie", MovieSchema);

export default MovieModel;
