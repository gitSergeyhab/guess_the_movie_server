import { Router } from "express";
import { moviesController } from "../controllers/movie-controller";
import { testsDBController } from "../controllers/tests-db-controller";
import { asyncHandler } from "../middlewares/async-handler";

const testsRouter  = Router();

testsRouter.post('/', asyncHandler(testsDBController.writeTestsToDB));
testsRouter.delete('/:category', asyncHandler(testsDBController.deleteTestsFromDB));

export {testsRouter}