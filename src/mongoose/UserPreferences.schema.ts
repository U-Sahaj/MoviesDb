import { Document, Schema } from 'mongoose';
import { UserPreferencesType } from '../Interfaces/UserPreferencesType';


export interface UserPreferencesDocument extends UserPreferencesType, Document {}

export const UserPreferencesSchema = new Schema<UserPreferencesDocument>({
  user_id: { type: String, required: true },
  preferred_languages: [String],
  favourite_actors: [String],
  favourite_directors: [String]
});
