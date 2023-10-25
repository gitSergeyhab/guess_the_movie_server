import { Router } from "express";
import { asyncHandler } from "../middlewares/async-handler";
import { gameController } from "../controllers/game-controller";
import { authMiddleware } from "../middlewares/auth-middleware";

const gameRouter  = Router();

gameRouter.post('/single/start', authMiddleware, asyncHandler(gameController.startGame));
gameRouter.post('/single/check-answer', authMiddleware, asyncHandler(gameController.checkAnswer));
gameRouter.post('/single/skip-test', authMiddleware, asyncHandler(gameController.skipTest));
gameRouter.post('/single/game-over', authMiddleware, asyncHandler(gameController.gameOver));
gameRouter.post('/single/next-level', authMiddleware, asyncHandler(gameController.nextLevel));

export {gameRouter}