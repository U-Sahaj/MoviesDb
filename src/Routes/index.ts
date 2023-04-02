import { Router } from 'express'
import { getMovieRecommendationsForAllUsers } from '../Controllers/MovieRecommendationHTTPController'
 
const MovieRecommendationRouter: Router = Router({strict:false})

MovieRecommendationRouter.get('/movies/users', getMovieRecommendationsForAllUsers)

export default MovieRecommendationRouter