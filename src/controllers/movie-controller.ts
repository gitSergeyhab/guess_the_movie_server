import { Request, Response } from "express";
import { top250Kp } from "../data/movies/top-250-kp";

class MoviesController {
    getAllMovies(req: Request, res: Response) {
        return res.status(200).json(top250Kp) 
    }
}

export const moviesController = new MoviesController()