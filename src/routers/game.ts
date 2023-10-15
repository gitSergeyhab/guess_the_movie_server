import { Router } from "express";
import { asyncHandler } from "../middlewares/async-handler";
import { statsController } from "../controllers/stats-controller";
import { gameService } from "../services/game-service";
import { gameController } from "../controllers/game-controller";

const gameRouter  = Router();


gameRouter.get('/single-player-game', asyncHandler(gameController.getSinglePlayerGame));
gameRouter.get('/check-answer', asyncHandler(gameController.checkAnswer));

export {gameRouter}