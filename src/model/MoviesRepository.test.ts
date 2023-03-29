import { describe, it, beforeAll, afterAll, expect } from 'vitest'
import { connect, disconnect, Model } from 'mongoose';
import { MoviesRepository } from './MoviesRepository';
import { CreditsType } from '../Interfaces/CreditsType';
import { DetailsType } from '../Interfaces/DetailsType';
import { UserPreferencesModel } from '../mongoose/UserPreferences.model';
import { UserPreferencesDocument } from '../mongoose/UserPreferences.schema';
import { CreditsModel } from '../mongoose/Credits.model';
import { DetailsModel } from '../mongoose/Details.model';
import { UserPreferencesType } from '../Interfaces/UserPreferencesType';

describe('MoviesRepository', () => {
  let userPreferencesModel: Model<UserPreferencesDocument>;
  let creditsModel: Model<CreditsType>;
  let detailsModel: Model<DetailsType>;
  let moviesRepository: MoviesRepository;

  beforeAll(async () => {
    await connect('mongodb://localhost:27017/TestDb');

    userPreferencesModel = UserPreferencesModel
    creditsModel = CreditsModel
    detailsModel = DetailsModel

    moviesRepository = new MoviesRepository(userPreferencesModel, creditsModel, detailsModel);
  
    // await moviesRepository.loadData(userPreferencesModel, creditsModel, detailsModel);
    // await loadData(userPreferencesModel, creditsModel, detailsModel);
  });

  afterAll(async () => {
    await disconnect();
  });


  describe.skip('check load data', () => {
    it('returns the defined data above', async () => {
      const foundUserPreference = await UserPreferencesModel.findOne({ user_id: '100' });
      if (!foundUserPreference) {
        throw new Error('User preference not found');
      }
      expect(foundUserPreference.preferred_languages).toEqual(['English', 'Spanish']);
    }); 
  });

  describe.skip('findMoviesByDirectors', () => {
    it('returns the movies directed by the given director name', async () => {
      const foundMovies = await moviesRepository.findMoviesByDirector('Steven Spielberg');
      expect(foundMovies).toEqual(['Avatar'])
      // expect(recommendedMovies).toEqual(['Avatar', 'Pirates of the Caribbean: At World\'s End']);
    });
  });


  describe('findMovies', () => {
    it('returns the top 3 recommended movies for a user based on their preferences', async () => {
      const userPreferences = {
        user_id: '100',
        preferred_languages: ['en', 'es'],
        favourite_actors: ['Denzel Washington', 'Kate Winslet', 'Tom Hanks'],
        favourite_directors: ['Steven Spielberg', 'Martin Scorsese'],
      };
      const recommendedMovies = await moviesRepository.findMoviesWithoutAgg(userPreferences.user_id);
      expect(recommendedMovies).toEqual(['Avatar'])
      // expect(recommendedMovies).toEqual(['Avatar', 'Pirates of the Caribbean: At World\'s End']);
    });
  });
})


async function loadData(userPreferencesModel: Model<UserPreferencesDocument>,
                        creditsModel: Model<CreditsType>, 
                        detailsModel: Model<DetailsType>) {

    const userPreferencesData: UserPreferencesType[] = [
      {
        user_id: "100",
        preferred_languages: ["en"],
        favourite_actors: [
          "Denzel Washington",
          "Kate Winslet",
          "Tom Hanks",
        ],
        favourite_directors: [
          "Steven Spielberg",
          "Martin Scorsese",
        ],
      },
      {
        user_id: "101",
        preferred_languages: ["en"],
        favourite_actors: ["Denzel Washington", "Anne Hathaway", "Tom Hanks"],
        favourite_directors: ["Guy Ritchie", "Quentin Tarantino"],
      },
    ];
  
    const movieCreditsData: CreditsType[] = [
      {
        movie_id: 1,
        title: "Avatar",
        cast: [
          {
            castId: 242,
            name: "Sam Worthington",
          },
          {
            castId: 3,
            name: "Zoe Saldana",
          },
          {
            castId: 4,
            name: "Denzel Washington",
          },
        ],
        crew: [
          {
            crewId: 1721,
            job: "Editor",
            name: "Stephen E. Rivkin",
          },
          {
            crewId: 496,
            job: "Production Design",
            name: "Rick Carter",
          },
          {
            crewId: 4,
            job: "Director",
            name: "Steven Spielberg",
          },
        ],
      },
      {
        movie_id: 2,
        title: "Pirates of the Caribbean: At World's End",
        cast: [
          {
            castId: 4,
            name: "Johnny Depp",
          },
          {
            castId: 5,
            name: "Orlando Bloom",
          },
        ],
        crew: [
          {
            crewId: 120,
            job: "Director of Photography",
            name: "Dariusz Wolski",
          },
          {
            crewId: 1704,
            job: "Director",
            name: "Gore Verbinski",
          },
        ],
      },
      {
        movie_id: 3,
        title: "Spirited Away",
        cast: [
          {
            castId: 45,
            name: "Rumi Hiiragi",
          },
          {
            castId: 46,
            name: "Miyu Irino",
          },
        ],
        crew: [
          {
            crewId: 3706,
            job: "Director",
            name: "Hayao Miyazaki",
          },
        ],
      },
    ];
  
    const movieDetailsData: DetailsType[] = [
      {
        id: "1",
        original_language: "en",
      },
      {
        id: "2",
        original_language: "en",
      },
      {
        id: "3",
        original_language: "ja",
      },
      {
        id: "4",
        original_language: "fr",
      },
    ];
    
    // load user preferences data
    await userPreferencesModel.insertMany(userPreferencesData);

    // load movie credits data
    await creditsModel.insertMany(movieCreditsData);

    // load movie details data
    await detailsModel.insertMany(movieDetailsData);
};

