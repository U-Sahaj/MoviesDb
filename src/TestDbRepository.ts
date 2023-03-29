import { Model } from 'mongoose';
import { CreditsType } from './Interfaces/CreditsType';
import { MoviesType } from './Interfaces/DetailsType';
import { UserPreferencesType } from './Interfaces/UserPreferencesType';


class TestDbRepository {
  constructor(
    private readonly userModel: Model<UserPreferencesType>,
    private readonly creditsModel: Model<CreditsType>,
    private readonly moviesModel: Model<MoviesType>,
  ) {}

  async insertUserPreferencesData(data: UserPreferencesType[]): Promise<void> {
    await this.userModel.insertMany(data);
  }

  async insertMovieCreditsData(data: CreditsType[]): Promise<void> {
    await this.creditsModel.insertMany(data);
  }

  async insertMovieDetailsData(data: MoviesType[]): Promise<void> {
    await this.moviesModel.insertMany(data);
  }

  async clearData(): Promise<void> {
    await Promise.all([
      this.userModel.deleteMany({}),
      this.creditsModel.deleteMany({}),
      this.moviesModel.deleteMany({}),
    ]);
  }

  async loadDataIntoTestDb(): Promise<void> {
    await this.clearData();
    const userPreferencesData = [
      {
        user_id: '100',
        preferred_languages: ['English', 'Spanish'],
        favourite_actors: [
          'Denzel Washington',
          'Kate Winslet',
          'Emma Suárez',
          'Tom Hanks',
        ],
        favourite_directors: [
          'Steven Spielberg',
          'Martin Scorsese',
          'Pedro Almodóvar',
        ],
      },
      {
        user_id: '101',
        preferred_languages: ['English'],
        favourite_actors: ['Denzel Washington', 'Anne Hathaway', 'Tom Hanks'],
        favourite_directors: ['Guy Ritchie', 'Quentin Tarantino'],
      },
    ];
    const movieCreditsData = [
      {
        creditsId: 1,
        title: 'Avatar',
        cast: [
          { castId: 242, name: 'Sam Worthington' },
          { castId: 3, name: 'Zoe Saldana' },
        ],
        crew: [
          { crewId: 1721, job: 'Editor', name: 'Stephen E. Rivkin' },
          { crewId: 496, job: 'Production Design', name: 'Rick Carter' },
        ],
      },
      {
        creditsId: 2,
        title: "Pirates of the Caribbean: At World's End",
        cast: [
          { castId: 4, name: 'Johnny Depp' },
          { castId: 5, name: 'Orlando Bloom' },
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
      },
    ];
    const movieDetailsData = [
      { id: '1', original_language: 'en' },
      { id: '2', original_language: 'en' },
      { id: '3', original_language: 'ja' },
      { id: '4', original_language: 'fr' },
    ];
    await Promise.all([
      this.insertUserPreferencesData(userPreferencesData),
      this.insertMovieCreditsData(movieCreditsData),
      this.insertMovieDetailsData(movieDetailsData),
    ]);
  }


//--------------------------------------------------  
    async getRecommendedMovies(userPreferences: UserPreferencesType): Promise<RecommendedMovieType[]> {
      const { preferred_languages, favourite_actors, favourite_directors } = userPreferences;
  
      const pipeline = [
        // match user's preferred languages
        {
          $match: {
            original_language: {
              $in: preferred_languages
            }
          }
        },
        // join with credits collection
        {
          $lookup: {
            from: 'credits',
            let: { movieId: '$id' },
            pipeline: [
              // match movies that have matching credits
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ['$title', '$$movieId'] },
                      { $in: ['$name', favourite_actors] },
                      { $in: ['$name', favourite_directors] },
                      { $eq: ['$job', 'Director'] }
                    ]
                  }
                }
              },
              // filter fields for output
              {
                $project: {
                  _id: 0,
                  name: 1,
                  job: 1
                }
              }
            ],
            as: 'credits'
          }
        },
        // filter out movies that don't have matching credits
        {
          $match: {
            credits: {
              $not: { $size: 0 }
            }
          }
        },
        // filter fields for output
        {
          $project: {
            _id: 0,
            id: 1,
            original_language: 1,
            credits: 1
          }
        }
      ];
  
      const recommendedMovies = await this.moviesModel.aggregate<RecommendedMovieType>(pipeline);
  
      return recommendedMovies;
    }
  }
  
  export type RecommendedMovieType = {
    id: string;
    original_language: string;
    credits: {
      name: string;
      job: string;
    }[];
  }

//--------------------------------------------------
export class MovieRepository {
  private readonly userPreferencesModel: Model<UserPreferencesType>;
  private readonly creditsModel: Model<CreditsType>;
  private readonly moviesModel: Model<MoviesType>;

  constructor(
    userPreferencesModel: Model<UserPreferencesType>,
    creditsModel: Model<CreditsType>,
    moviesModel: Model<MoviesType>
  ) {
    this.userPreferencesModel = userPreferencesModel;
    this.creditsModel = creditsModel;
    this.moviesModel = moviesModel;
  }

  async getMovieRecommendationsByUserId(userId: string): Promise<MoviesType[]> {
    const userPreferences = await this.userPreferencesModel.findOne({
      user_id: userId,
    });
    if (!userPreferences) {
      return [];
    }

    const {
      preferred_languages,
      favourite_actors,
      favourite_directors,
    } = userPreferences;

    const recommendedMovies: MoviesType[] = [];
    const creditsMap = new Map<string, CreditsType>();

    const credits = await this.creditsModel.find({});
    credits.forEach((credit) => {
      creditsMap.set(credit.title, credit);
    });

    const movies = await this.moviesModel.find({});
    movies.forEach((movie) => {
      const movieCredits = creditsMap.get(movie.id);
      if (
        movieCredits &&
        preferred_languages.includes(movie.original_language) &&
        this.hasMatchingActor(favourite_actors, movieCredits.cast) &&
        this.hasMatchingDirector(favourite_directors, movieCredits.crew)
      ) {
        recommendedMovies.push(movie);
      }
    });

    return recommendedMovies;
  }

  private hasMatchingActor(favouriteActors: string[], cast: CastType[]): boolean {
    return cast.some((actor) => favouriteActors.includes(actor.name));
  }

  private hasMatchingDirector(
    favouriteDirectors: string[],
    crew: CrewType[]
  ): boolean {
    return crew.some(
      (director) =>
        director.job.toLowerCase() === 'director' &&
        favouriteDirectors.includes(director.name)
    );
  }
//--------------------------------------------------

}

export default TestDbRepository;
