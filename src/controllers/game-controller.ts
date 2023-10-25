import { Request, Response } from "express";
import { moviesIMDB } from "../data/movies-imdb/movies-imdb";
import { AuthRequest } from "../types/users";
import { AdminDataRequestQuery } from "../types/admin-types";
import { mongoService } from "../services/mongo-service";
import { StatusCode } from "../const";
import { gameService } from "../services/game-service";
import { CheckAnswerForSinglePlayer } from "../types/game-types";
import { ITestFromMongo } from "../types/test-type";
import { localDbService } from "../services/local-db-sevice";
import { ApiError } from "../middlewares/error-middleware";
import { ErrorMessages } from "../messages/error-messages";





class GameController {
    async startGame(req: AuthRequest, res: Response) {
        try {
            const {body, user} = req;
            const {userId} = user;
            const {category} = body;
            const data = await gameService.startGameHandler({category, userId})
            console.log({data}, 'startGame')
            return res.status(StatusCode.Added).json(data)
        } catch (err) {
            console.error({err})
            const {message} = err
            throw new ApiError(StatusCode.ServerError, message || ErrorMessages.ServerError)
        }
    }

    async checkAnswer(req: AuthRequest, res: Response) {
        try {
            const {body, user} = req;
            const {userId} = user;
            const {testId, answerId, gameId} = body;
            const data = await gameService.checkAnswerHandler({answerId, gameId, testId, userId})
            await gameService.saveGameResult(data.game);
            return res.status(StatusCode.Added).json(data);

        } catch (err) {
            console.error({err})
            const {message} = err
            throw new ApiError(StatusCode.ServerError, message || ErrorMessages.ServerError)
        }
    }


    async skipTest(req: AuthRequest, res: Response) {
        try {
            const { body, user } = req;
            const { userId } = user;
            const { gameId } = body;
            const game = await gameService.skipTestHandler({gameId, userId})
            await gameService.saveGameResult(game);
            return res.status(StatusCode.Added).json(game)

        } catch (err) {
            console.error({err})
            const {message} = err
            throw new ApiError(StatusCode.ServerError, message || ErrorMessages.ServerError)
        }
    }

    async nextLevel(req: AuthRequest, res: Response) {
        try {
            const {body, user} = req;
            const {userId} = user;
            const {category} = body;
            const tests = await gameService.getTests({category, userId})
            console.log({tests}, 'nextLevel')
            return res.status(StatusCode.Added).json(tests)

        } catch (err) {
            console.error({err})
            const {message} = err
            throw new ApiError(StatusCode.ServerError, message || ErrorMessages.ServerError)
        }
    }

    async gameOver(req: AuthRequest, res: Response) {
        try {
            const {body, user} = req;
            const {userId} = user;
            const {gameId} = body;
            const game = await gameService.exitGameHandler({userId, gameId});
            await gameService.saveGameResult(game);
            return res.status(StatusCode.Added).json(game)

        } catch (err) {
            console.error({err})
            const {message} = err
            throw new ApiError(StatusCode.ServerError, message || ErrorMessages.ServerError)
        }
    }
}

export const gameController = new GameController()