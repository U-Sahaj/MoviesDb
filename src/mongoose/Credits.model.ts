import mongoose from "mongoose";
import { CreditsType } from "../Interfaces/CreditsType";
import { creditsSchema } from "./Credits.schema";

const CreditsModel = mongoose.model<CreditsType>('Credits', creditsSchema);

export { CreditsModel };
