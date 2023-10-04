import { Request, Response } from "express";
import { moviesIMDB } from "../data/movies-imdb/movies-imdb";


class MoviesController {
    getAllMovies(req: Request, res: Response) {
        return res.status(200).json({moviesIMDB}) 
    }
}

export const moviesController = new MoviesController()