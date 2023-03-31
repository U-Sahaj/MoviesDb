import { MovieRecommendationType } from "./MovieRecommendationType";

export interface IMoviesRepository {
    getMovieRecommendationsForAllUsers(): Promise<MovieRecommendationType[]>;

    findMoviesByDirector(director: string): Promise<string[]>;
    findMoviesWithoutAgg(userId: string): Promise<string[]>;

}
  