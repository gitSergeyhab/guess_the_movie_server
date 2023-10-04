import { Router } from "express";
import { moviesController } from "../controllers/movie-controller";
import { testsDBController } from "../controllers/tests-db-controller";

const testsRouter  = Router();

testsRouter.get('/rus/write-tests', testsDBController.writeRusMovieTestsToDB);

export {testsRouter}