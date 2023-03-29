import mongoose from "mongoose";
import { CreditsType } from "../Interfaces/CreditsType";
import { creditsSchema } from "./Credits.schema";

const CreditsModel = mongoose.model<CreditsType>('MoviesCredits', creditsSchema);

export { CreditsModel };
