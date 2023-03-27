import mongoose from "mongoose";
import { UserPreferencesDocument, UserPreferencesSchema } from "./UserPreferences.schema";

export const UserPreferencesModel = mongoose.model<UserPreferencesDocument>('UserPreferences', UserPreferencesSchema);

