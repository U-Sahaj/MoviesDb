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
exports.MovieRecommendationService = void 0;
const MoviesRepository_1 = require("../model/MoviesRepository");
class MovieRecommendationService {
    constructor() { }
    static getInstance() {
        if (!MovieRecommendationService.instance) {
            MovieRecommendationService.instance = new MovieRecommendationService();
        }
        return MovieRecommendationService.instance;
    }
    getMovieRecommendationsForAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`MovieRecommendationService: getMovieRecommendationsForAllUsers start`);
            const recommendations = yield MoviesRepository_1.MoviesRepository.getInstance().getMovieRecommendationsForAllUsers();
            console.log(`MovieRecommendationService: `, recommendations);
            return recommendations;
        });
    }
}
exports.MovieRecommendationService = MovieRecommendationService;
