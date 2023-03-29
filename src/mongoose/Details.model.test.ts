import mongoose from 'mongoose';
import { afterAll, afterEach, beforeAll, describe, expect, it} from 'vitest';
import { DetailsType } from '../Interfaces/DetailsType';
import { DetailsModel } from './Details.model';

describe.skip('MoviesModel', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/TestDb');
  });

  afterEach(async () => {
    await DetailsModel.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should create a new movie document', async () => {
    const newMovie: DetailsType = {
      id: '19995',
      original_language: 'en',
    };

    const createdMovie = await DetailsModel.create(newMovie);

    expect(createdMovie.id).toBe(newMovie.id);
    expect(createdMovie.original_language).toBe(newMovie.original_language);
  });

  it('should retrieve a previously created movie document', async () => {
    const newMovie: DetailsType = {
      id: '19995',
      original_language: 'en',
    };

    await DetailsModel.create(newMovie);

    const retrievedMovie = await DetailsModel.findOne({ id: newMovie.id });

    expect(retrievedMovie?.id).toBe(newMovie.id);
    expect(retrievedMovie?.original_language).toBe(
      newMovie.original_language
    );
  });
});
