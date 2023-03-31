import mongoose from "mongoose";
import { CreditsDocument, creditsSchema } from "./Credits.schema";

const CreditsModel = mongoose.model<CreditsDocument>('MoviesCredits', creditsSchema);

export { CreditsModel };
