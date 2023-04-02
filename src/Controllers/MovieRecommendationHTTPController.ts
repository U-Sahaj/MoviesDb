import {Request, Response} from "express"
import {MovieRecommendationService} from "../Service/MovieRecommendationService"

export const getMovieRecommendationsForAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log("controller:")
        const recommendations = 
            MovieRecommendationService.getInstance().getMovieRecommendationsForAllUsers();
        res.status(200).send(recommendations);
    } catch (error: any) {
      res.status(500).send(error.message);
    }
}



  