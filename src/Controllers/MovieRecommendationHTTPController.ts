import {Request, Response} from "express"
import {MovieRecommendationService} from "../Service/MovieRecommendationService"

export const getMovieRecommendationsForAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log("MovieRecommendationHTTPController: start")
        const recommendations = 
            await MovieRecommendationService.getInstance().getMovieRecommendationsForAllUsers();
            console.log(`MovieRecommendationHTTPController: `,recommendations)
            res.status(200).send(recommendations);
    } catch (error: any) {
      res.status(500).send(error.message);
    }
}



  