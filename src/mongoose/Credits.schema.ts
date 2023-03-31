import mongoose, { Document } from 'mongoose';
import { CreditsType } from '../Interfaces/CreditsType';

const castSchema = new mongoose.Schema({
  castId: Number,
  name: String,
});

const crewSchema = new mongoose.Schema({
  crewId: Number,
  job: String,
  name: String,
});

export const creditsSchema = new mongoose.Schema<CreditsType>({
  movie_id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  cast: {
    type: [castSchema],
    required: true,
  },
  crew: {
    type: [crewSchema],
    required: true,
  },
});

export interface CreditsDocument extends CreditsType, Document {}

