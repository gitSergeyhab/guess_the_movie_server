import { OperationCategory } from "../const/admin-const";
import { TestResult } from "../const/game-const";
import { ApiError } from "../middlewares/error-middleware";
import { GameStatus, SinglePlayerGame } from "../types/game-types"
import { getLivesPassesByLvl } from "../utils/game-utils";
import crypto from "crypto";


export interface SinglePlayerGameStore {
    [userId: string]: SinglePlayerGame
  }



// export const singlePlayerGameStore: SinglePlayerGameStore = {}

interface CreateGame {
    userId: string,
    category: OperationCategory
}



const startDataGame = {
    currentTestNumber: 0,
    level: 0,
    points: 0,
    lives: getLivesPassesByLvl(0).lives,
    skips: getLivesPassesByLvl(0).lives,
    results: [[]] as TestResult[][],
    status: GameStatus.Active
}

interface UpdateGame {
    userId: string;
    gameId: string;
    updateData: {
        level?: number;
        status?: GameStatus;
        points?: number;
        skips?: number;
        lives?: number;
        results?: TestResult[][];
        currentTestNumber?: number;
    }

}


class LocalDbService {
    singlePlayerGameStore: SinglePlayerGameStore = {};
    readGame(userId: string) {
        // у юзера всего 1 игра, поэтому получаем ее не по GAME_ID а по USER_ID
        const game = this.singlePlayerGameStore[userId];
        if (!game) {
            throw ApiError.BadRequest('у этого пользователя нет сохраненной игры')
        }
        return game;
    }

    createGame({category, userId}: CreateGame) {
        const game: SinglePlayerGame = {
            category,
            userId,
            ...startDataGame,
            gameId: crypto.randomUUID()
        };
        // старая, если есть, удаляется
        this.singlePlayerGameStore[userId] = game;
        return game;
    }

    updateGame({gameId, userId, updateData}: UpdateGame) {
        const oldGame = this.readGame(userId);

        const oldGameId = oldGame.gameId;
        if (oldGameId!==gameId) {
            throw ApiError.BadRequest('у этого пользователя сохраненной игры с таким ID')
        }
        const game = { ...oldGame, ...updateData};

        console.log({game}, 'updateGame')
        this.singlePlayerGameStore[userId] = game;
        console.log(this.singlePlayerGameStore[userId], 'updateGame - this.singlePlayerGameStore[userId]')
        return game as SinglePlayerGame;
    }

    deleteGame(userId: string) {
        delete this.singlePlayerGameStore[userId];
    }
}

export const localDbService = new LocalDbService()