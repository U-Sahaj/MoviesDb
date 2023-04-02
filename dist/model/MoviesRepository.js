"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoviesRepository = void 0;
const UserPreferences_model_1 = require("../mongoose/UserPreferences.model");
const Credits_model_1 = require("../mongoose/Credits.model");
const Details_model_1 = require("../mongoose/Details.model");
// define the langMap object
const langMap = {
    "English": "en",
    "Spanish": "es",
    "French": "fr",
    "Japanese": "ja"
    // add more mappings as needed
};
class MoviesRepository {
    constructor() {
        this.userPreferencesModel = UserPreferences_model_1.UserPreferencesModel;
        this.creditsModel = Credits_model_1.CreditsModel;
        this.detailsModel = Details_model_1.DetailsModel;
    }
    ;
    static getInstance() {
        if (!MoviesRepository.instance) {
            MoviesRepository.instance = new MoviesRepository();
        }
        return MoviesRepository.instance;
    }
    getMovieRecommendationsForAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`MoviesRepository: `, this.userPreferencesModel);
            const allUserPreferences = yield this.userPreferencesModel.find().lean();
            console.log(`MoviesRepository: `, allUserPreferences);
            const allRecommendations = yield Promise.all(allUserPreferences.map((userPref) => __awaiter(this, void 0, void 0, function* () {
                const userId = userPref.user_id;
                console.log(`MoviesRepository:`, userId);
                const movieRecommendations = yield this.findMoviesWithoutAgg(userId);
                console.log(`MoviesRepository: movies recommended for ${userId} are `, movieRecommendations);
                return { user: userId, movies: movieRecommendations };
            })));
            console.log(`MoviesRepository: `, allRecommendations);
            return allRecommendations;
        });
    }
    findMoviesByDirector(director) {
        return __awaiter(this, void 0, void 0, function* () {
            const movies = yield this.creditsModel.find({ "crew.name": "Steven Spielberg" }, { movie_id: 1, title: 1, _id: 0 });
            return movies.map(movie => movie.title);
        });
    }
    ;
    findMoviesWithoutAgg(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const userPreferences = yield this.userPreferencesModel.findOne({ user_id: userId });
            if (!userPreferences) {
                throw new Error('User not found');
            }
            // Find movie ids from credits model that match user preferences
            const movieIds = yield this.creditsModel.distinct('movie_id', {
                $or: [
                    { "crew.job": "Director" },
                    { "crew.name": { $in: userPreferences.favourite_directors } },
                    { "cast.name": { $in: userPreferences.favourite_actors } },
                ]
            });
            // map the preferred languages to original language codes
            const languageCodes = userPreferences.preferred_languages.map(lang => langMap[lang]);
            // Find recommended movies from details model
            const recommendedMovies = yield this.detailsModel.find({
                id: { $in: movieIds },
                original_language: { $in: languageCodes }
            }).select('id');
            // Filter movies from credits model by recommended movie ids
            const movies = yield this.creditsModel.find({
                movie_id: { $in: recommendedMovies.map(movie => movie.id) },
                "crew.job": "Director",
                "crew.name": { $in: userPreferences.favourite_directors },
                "cast.name": { $in: userPreferences.favourite_actors },
            })
                .select('title')
                .limit(3);
            // Return movie titles as array of strings
            console.log(`findMoviesWithoutAgg: `, movies);
            return movies.map(movie => movie.title).sort();
        });
    }
    ;
    findMoviesWithAgg(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const userPreferences = yield this.userPreferencesModel.findOne({ user_id: userId });
            if (!userPreferences) {
                throw new Error('User not found');
            }
            const movies = yield this.creditsModel.aggregate([
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
            console.log(`MoviesRepository.findMovies: movies = ${JSON.stringify(movies, null, 2)}`);
            return movies.map((movie) => movie.title);
        });
    }
}
exports.MoviesRepository = MoviesRepository;
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
