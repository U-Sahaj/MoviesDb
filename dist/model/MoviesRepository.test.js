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
const vitest_1 = require("vitest");
const mongoose_1 = require("mongoose");
const MoviesRepository_1 = require("./MoviesRepository");
const UserPreferences_model_1 = require("../mongoose/UserPreferences.model");
const Credits_model_1 = require("../mongoose/Credits.model");
const Details_model_1 = require("../mongoose/Details.model");
(0, vitest_1.describe)('MoviesRepository', () => {
    let userPreferencesModel;
    let creditsModel;
    let detailsModel;
    let moviesRepository;
    (0, vitest_1.beforeAll)(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, mongoose_1.connect)('mongodb://test-mongo:27017/TestDB');
        userPreferencesModel = UserPreferences_model_1.UserPreferencesModel;
        creditsModel = Credits_model_1.CreditsModel;
        detailsModel = Details_model_1.DetailsModel;
        moviesRepository = MoviesRepository_1.MoviesRepository.getInstance();
        // await moviesRepository.loadData(userPreferencesModel, creditsModel, detailsModel);
        // await loadData(userPreferencesModel, creditsModel, detailsModel);
    }));
    (0, vitest_1.afterAll)(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, mongoose_1.disconnect)();
    }));
    (0, vitest_1.describe)('check load data', () => {
        (0, vitest_1.it)('returns the defined data above', () => __awaiter(void 0, void 0, void 0, function* () {
            const foundUserPreference = yield UserPreferences_model_1.UserPreferencesModel.findOne({ user_id: '100' });
            if (!foundUserPreference) {
                throw new Error('User preference not found');
            }
            (0, vitest_1.expect)(foundUserPreference.preferred_languages).toEqual(['Spanish']);
        }));
    });
    vitest_1.describe.skip('findMoviesByDirectors', () => {
        (0, vitest_1.it)('returns the movies directed by the given director name', () => __awaiter(void 0, void 0, void 0, function* () {
            const foundMovies = yield moviesRepository.findMoviesByDirector('Steven Spielberg');
            (0, vitest_1.expect)(foundMovies).toEqual(['Avatar']);
            // expect(recommendedMovies).toEqual(['Avatar', 'Pirates of the Caribbean: At World\'s End']);
        }));
    });
    vitest_1.describe.skip('findMovies', () => {
        (0, vitest_1.it)('returns the top 3 recommended movies for a user based on their preferences', () => __awaiter(void 0, void 0, void 0, function* () {
            const userPreferences = {
                user_id: '100',
                preferred_languages: ['English', 'Spanish'],
                favourite_actors: ['Denzel Washington', 'Kate Winslet', 'Tom Hanks'],
                favourite_directors: ['Steven Spielberg', 'Martin Scorsese'],
            };
            const recommendedMovies = yield moviesRepository.findMoviesWithoutAgg(userPreferences.user_id);
            (0, vitest_1.expect)(recommendedMovies).toEqual(['Avatar']);
            // expect(recommendedMovies).toEqual(['Avatar', 'Pirates of the Caribbean: At World\'s End']);
        }));
    });
    vitest_1.describe.skip("getMovieRecommendationsForAllUsers", () => {
        (0, vitest_1.it)("returns an array of movie recommendations for all users", () => __awaiter(void 0, void 0, void 0, function* () {
            const recommendations = yield moviesRepository.getMovieRecommendationsForAllUsers();
            (0, vitest_1.expect)(recommendations).to.have.lengthOf(2);
            console.log(`MoviesRepsository.test:`, recommendations);
            // expect(recommendations[0].user).to.equal("100");
            // expect(recommendations[0].movies).to.have.lengthOf(2);
            // expect(recommendations[0].movies[0]).to.equal("Avatar");
            // expect(recommendations[0].movies[1]).to.equal("Pirates of the Caribbean: At World's End");
            // expect(recommendations[1].user).to.equal("101");
            // expect(recommendations[1].movies).to.have.lengthOf(2);
            // expect(recommendations[1].movies[0]).to.equal("Avatar");
            // expect(recommendations[1].movies[1]).to.equal("Pirates of the Caribbean: At World's End");
        }));
    });
});
function loadData(userPreferencesModel, creditsModel, detailsModel) {
    return __awaiter(this, void 0, void 0, function* () {
        const userPreferencesData = [
            {
                user_id: "100",
                preferred_languages: ["Spanish"],
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
                preferred_languages: ["English"],
                favourite_actors: ["Denzel Washington", "Anne Hathaway", "Tom Hanks"],
                favourite_directors: ["Guy Ritchie", "Quentin Tarantino"],
            },
        ];
        const movieCreditsData = [
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
        const movieDetailsData = [
            {
                id: "1",
                original_language: "es",
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
        yield userPreferencesModel.insertMany(userPreferencesData);
        // load movie credits data
        yield creditsModel.insertMany(movieCreditsData);
        // load movie details data
        yield detailsModel.insertMany(movieDetailsData);
    });
}
;
