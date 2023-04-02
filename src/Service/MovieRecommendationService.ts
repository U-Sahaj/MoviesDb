import { MovieRecommendationType } from "../Interfaces/MovieRecommendationType";
import { MoviesRepository } from "../model/MoviesRepository";

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
    console.log(`MovieRecommendationService: getMovieRecommendationsForAllUsers start`)
    const recommendations = await MoviesRepository.getInstance().getMovieRecommendationsForAllUsers();
    console.log(`MovieRecommendationService: `,recommendations)

    return recommendations;
  }
}
