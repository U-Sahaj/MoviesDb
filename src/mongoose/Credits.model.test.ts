import mongoose from 'mongoose';
import { afterAll, afterEach, beforeAll, describe, expect, it, test } from 'vitest';
import { CreditsType } from '../Interfaces/CreditsType';
import { CreditsModel } from './Credits.model';

describe.skip('CreditsModel', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/TestDb');
  });

  afterEach(async () => {
    await CreditsModel.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should create and save credits document successfully for Avatar', async () => {
    const creditsData: CreditsType = {
      movie_id: 19995,
      title: 'Avatar',
      cast: [
        {
          castId: 242,
          name: 'Sam Worthington',
        },
        {
          castId: 3,
          name: 'Zoe Saldana',
        },
      ],
      crew: [
        {
          crewId: 1721,
          job: 'Editor',
          name: 'Stephen E. Rivkin',
        },
        {
          crewId: 496,
          job: 'Production Design',
          name: 'Rick Carter',
        },
      ],
    };

    const credits = new CreditsModel(creditsData);
    const savedCredits = await credits.save();

    expect(savedCredits._id).toBeDefined();
    expect(savedCredits.title).toBe(creditsData.title);
  });

  it('should create and save credits document successfully for Pirates of the Caribbean', async () => {
    const creditsData: CreditsType = {
      movie_id: 285,
      title: "Pirates of the Caribbean: At World's End",
      cast: [
        {
          castId: 4,
          name: 'Johnny Depp',
        },
        {
          castId: 5,
          name: 'Orlando Bloom',
        },
      ],
      crew: [
        {
          crewId: 120,
          job: 'Director of Photography',
          name: 'Dariusz Wolski',
        },
        {
          crewId: 1704,
          job: 'Director',
          name: 'Gore Verbinski',
        },
      ],
    };

    const credits = new CreditsModel(creditsData);
    const savedCredits = await credits.save();

    expect(savedCredits._id).toBeDefined();
    expect(savedCredits.title).toBe(creditsData.title);
  });
});


