import { IMoviesRepository } from "../Interfaces/IMoviesRepository";
import { MovieRecommendationType } from "../Interfaces/MovieRecommendationType";
import { MoviesRepository } from "../model/MoviesRepository"

export class MovieRecommendationService {
  private static instance: MovieRecommendationService;

  private constructor() {}

  public static getInstance(): MovieRecommendationService {
    if (!MovieRecommendationService.instance) {
      MovieRecommendationService.instance = new MovieRecommendationService();
    }
    return MovieRecommendationService.instance;
  }

  async getMovieRecommendationsForAllUsers(): Promise<MovieRecommendationType[]> {
    const recommendations = await MoviesRepository.getInstance().getMovieRecommendationsForAllUsers();
    return recommendations;
  }
}
