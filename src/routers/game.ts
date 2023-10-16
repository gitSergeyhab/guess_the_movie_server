import { Router } from "express";
import { asyncHandler } from "../middlewares/async-handler";
import { statsController } from "../controllers/stats-controller";
import { gameService } from "../services/game-service";
import { gameController } from "../controllers/game-controller";
import { authMiddleware } from "../middlewares/auth-middleware";

const gameRouter  = Router();


gameRouter.post('/single/start', authMiddleware, asyncHandler(gameController.startGame));
// gameRouter.get('/single/start', authMiddleware, asyncHandler(gameController.getSinglePlayerGame));

// gameRouter.get('/single/check-answer', authMiddleware, asyncHandler(gameController.checkAnswer));
gameRouter.post('/single/check-answer', authMiddleware, asyncHandler(gameController.checkAnswer));
gameRouter.post('/single/skip-test', authMiddleware, asyncHandler(gameController.skipTest));
gameRouter.post('/single/game-over', authMiddleware, asyncHandler(gameController.gameOver));
gameRouter.post('/single/next-level', authMiddleware, asyncHandler(gameController.nextLevel));


export {gameRouter}