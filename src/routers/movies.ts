import { Router } from "express";
import { moviesController } from "../controllers/movie-controller";

const moviesRouter  = Router();

moviesRouter.get('/', moviesController.getAllMovies);

export {moviesRouter}