import { Model } from 'mongoose';
import { CreditsType } from '../Interfaces/CreditsType';
import { DetailsType } from '../Interfaces/DetailsType';
import { UserPreferencesType } from '../Interfaces/UserPreferencesType';
import { UserPreferencesDocument } from '../mongoose/UserPreferences.schema';

export class MoviesRepository {
  private userPreferencesModel: Model<UserPreferencesDocument>;
  private creditsModel: Model<CreditsType>;
  private detailsModel: Model<DetailsType>;

  constructor(userPreferencesModel: Model<UserPreferencesDocument>,
              creditsModel: Model<CreditsType>, 
              detailsModel: Model<DetailsType>) {
    this.userPreferencesModel = userPreferencesModel;
    this.creditsModel = creditsModel;
    this.detailsModel = detailsModel;
  }


  async findMoviesByDirector(director: string): Promise<string[]> {

    const movies = await this.creditsModel.find(
      { "crew.name": "Steven Spielberg" },
      { movie_id: 1, title: 1, _id: 0 }
    );
    
    return movies.map(movie => movie.title);
  };

  async findMoviesWithoutAgg(userId: string): Promise<string[]> {

    const userPreferences = await this.userPreferencesModel.findOne({ user_id: userId });
    if (!userPreferences) {
      throw new Error('User not found');
    }
  
    // Find movie ids from credits model that match user preferences
    const movieIds = await this.creditsModel.distinct('movie_id', {
      $or: [
        { "crew.job": "Director" },
        { "crew.name": { $in: userPreferences.favourite_directors } },
        { "cast.name": { $in: userPreferences.favourite_actors } },
      ]
    });
  
    // Find recommended movies from details model
    const recommendedMovies = await this.detailsModel.find({
      id: { $in: movieIds },
      original_language: { $in: userPreferences.preferred_languages }
    }).select('id');

    // Filter movies from credits model by recommended movie ids
    const movies = await this.creditsModel.find({
      movie_id: { $in: recommendedMovies.map(movie => movie.id) },
      "crew.job": "Director",
      "crew.name": { $in: userPreferences.favourite_directors },
      "cast.name": { $in: userPreferences.favourite_actors },
    })
    .select('title')
    .limit(3);
  
    // Return movie titles as array of strings
    return movies.map(movie => movie.title);
  };

  async findMoviesWithAgg(userId: string): Promise<string[]> {
    const userPreferences = await this.userPreferencesModel.findOne({ user_id: userId });
    if (!userPreferences) {
      throw new Error('User not found');
    }
  
    const movies = await this.creditsModel.aggregate([
      {
        $lookup: {
          from: 'MoviesDetails',
          localField: 'movie_id',
          foreignField: 'id',
          as: 'details'
        }
      },
      {
        $match: {
          'cast.name': { $in: userPreferences.favourite_actors },
          'crew.name': { $in: userPreferences.favourite_directors },
          'crew.job': 'Director',
          'details.original_language': { $in: userPreferences.preferred_languages }
        }
      },
      {
        $project: {
          _id: 0,
          title: 1
        }
      },
      {
        $sort: {
          title: 1
        }
      },
      {
        $limit: 3
      }
    ]);
console.log(`MoviesRepository.findMovies: movies = ${JSON.stringify(movies, null, 2)}`)
    return movies.map((movie) => movie.title);
  }

}

//   async getRecommendedMovies(userId: string): Promise<MovieType[]> {
//     const userPreferences = await this.getUserPreferences(userId);

//     const recommendedMovies = await this.movieModel.find()

//     // const recommendedMovies = await this.movieModel
//     //   .find({
//     //     original_language: { $in: userPreferences.preferred_languages },
//     //     cast: { $elemMatch: { name: { $in: userPreferences.favourite_actors } } },
//     //     crew: {
//     //       $elemMatch: {
//     //         name: { $in: userPreferences.favourite_directors },
//     //         job: 'Director',
//     //       },
//     //     },
//     //   })
//     //   .limit(3); // limit to top 3
// console.log(`MoviesRepository:`,recommendedMovies)
//     return recommendedMovies
//   }

//   private async getUserPreferences(userId: string): Promise<UserPreferencesType> {
//     const userPreferences = await this.userModel.findOne({ user_id: userId });
//     if (!userPreferences) {
//       throw new Error(`User with id ${userId} not found`);
//     }
//     return userPreferences.toObject();
//   }

  
// const movieIds = movies
//   .filter((movie) => {
//     const preferredLanguages = userPreferences.preferred_languages;
//     const favouriteActors = userPreferences.favourite_actors;
//     const favouriteDirectors = userPreferences.favourite_directors;

//     return (
//       preferredLanguages.every((lang) =>
//         movie.languages.includes(lang.toLowerCase())
//       ) &&
//       favouriteActors.every((actor) =>
//         movie.cast.some((c) => c.name.toLowerCase() === actor.toLowerCase())
//       ) &&
//       favouriteDirectors.every((dir) =>
//         movie.crew.some(
//           (c) =>
//             c.job.toLowerCase() === "director" &&
//             c.name.toLowerCase() === dir.toLowerCase()
//         )
//       )
//     );
//   })
//   .map((movie) => movie.id);


// export class MoviesRepository {
//   async findRecommendedMovies(userId: string): Promise<string[]> {
//     const userPreferences: UserPreferencesType = await UserModel.findOne(
//       { user_id: userId },
//       { _id: 0, preferred_languages: 1, favourite_actors: 1, favourite_directors: 1 }
//     ).lean();

//     const credits: CreditsType[] = await CreditsModel.find(
//       {
//         $or: [
//           { 'cast.name': { $in: userPreferences.favourite_actors } },
//           { 'crew.name': { $in: userPreferences.favourite_directors, $nin: userPreferences.favourite_actors }, 'crew.job': 'Director' },
//         ]
//       },
//       { _id: 0, id: 1, title: 1 }
//     ).lean();

//     const movieIds: number[] = credits.map((credit: CreditsType) => credit.id);

//     const details: DetailsType[] = await DetailsModel.find(
//       { id: { $in: movieIds }, original_language: { $in: userPreferences.preferred_languages } },
//       { _id: 0, id: 1, title: 1 }
//     ).lean();

//     const recommendedMovies: string[] = details.map((detail: DetailsType) => detail.title);

//     return recommendedMovies;
//   }
// }
