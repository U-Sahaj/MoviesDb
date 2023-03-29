import mongoose from 'mongoose';
import { afterAll, afterEach, beforeAll, describe, expect, test } from 'vitest';
import { UserPreferencesModel } from './UserPreferences.model';

describe.skip('UserPreferencesModel', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/TestDb');
  });

  afterEach(async () => {
    await UserPreferencesModel.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  test('should create and retrieve a user preference document', async () => {
    const userPreferencesData = {
      user_id: '100',
      preferred_languages: ['English', 'Spanish'],
      favourite_actors: ['Denzel Washington', 'Kate Winslet', 'Emma SuÃ¡rez', 'Tom Hanks'],
      favourite_directors: ['Steven Spielberg', 'Martin Scorsese', 'Pedro AlmodÃ³var']
    };
    const createdUserPreference = await UserPreferencesModel.create(userPreferencesData);

    expect(createdUserPreference.user_id).toBe(userPreferencesData.user_id);

    const foundUserPreference = await UserPreferencesModel.findOne({ user_id: userPreferencesData.user_id });

    expect(foundUserPreference).toEqual(expect.objectContaining(userPreferencesData));

    console.log(`UserPreferences: ${foundUserPreference?.user_id}`)
    console.log(`UserPreferences: ${foundUserPreference?.preferred_languages}`)
    
  });
});
