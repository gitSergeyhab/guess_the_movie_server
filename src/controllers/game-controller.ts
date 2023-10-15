import { Request, Response } from "express";
import { moviesIMDB } from "../data/movies-imdb/movies-imdb";
import { AuthRequest } from "../types/users";
import { AdminDataRequestQuery } from "../types/admin-types";
import { mongoService } from "../services/mongo-service";
import { StatusCode } from "../const";
import { gameService } from "../services/game-service";
import { CheckAnswerForSinglePlayer } from "../types/game-types";
import { ITestFromMongo } from "../types/test-type";




class GameController {
    async getSinglePlayerGame(req: AuthRequest, res: Response) {
        const {query: q} = req;
        const query = q as unknown as AdminDataRequestQuery;
        const data = await gameService.readRandomTests(query.category, 3)
        return res.status(StatusCode.Ok).json((data)
        // .map(({name, slogan, budget, id}) => ({ name, id }))
        )
    }

    async checkAnswer(req: AuthRequest, res: Response) {
        const {query: q} = req;
        const query = q as unknown as CheckAnswerForSinglePlayer;
        const data = await gameService.getTestById(query.testId)
        const isAnswerRight = String(data.answer) === query.answerId
        console.log({isAnswerRight})
        return res.status(StatusCode.Ok).json(isAnswerRight)
    }


}

export const gameController = new GameController()