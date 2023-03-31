import mongoose from "mongoose";
import { DetailsDocument, detailsSchema } from "./Details.schema";

export const DetailsModel = mongoose.model<DetailsDocument>('MoviesDetails', detailsSchema);
