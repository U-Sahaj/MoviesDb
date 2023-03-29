import mongoose from "mongoose";
import { DetailsType } from "../Interfaces/DetailsType";
import { detailsSchema } from "./Details.schema";

export const DetailsModel = mongoose.model<DetailsType>('MoviesDetails', detailsSchema);
