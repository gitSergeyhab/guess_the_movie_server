import { OperationCategory } from "../const/admin-const";
import { GameType, MAX_LEVEL, TEST_COUNT, TestResult } from "../const/game-const";
import { ApiError } from "../middlewares/error-middleware";
import { TestModel } from "../models/tests";
import { CheckAnswerForSinglePlayer, GameStatus, SinglePlayerGame } from "../types/game-types";
import { ITestFromMongo } from "../types/test-type";
import { getLivesPassesByLvl } from "../utils/game-utils";
import { gameResultService } from "./game-result-service";
import { localDbService } from "./local-db-sevice";
import { mongoService } from "./mongo-service";

interface StartGame {
    userId: string,
    category: OperationCategory
}

interface CheckAnswer {
    userId: string;
    testId: string;
    answerId: string|number;
    gameId: string;
}

interface CheckNextLevel  {
    currentTestNumber: number;
    isLost: boolean;
    isLastLevel: boolean
}

interface GamePropsFound   {
    oldGame: SinglePlayerGame;
    isLastTest: boolean;
    isLastLevel: boolean;
    isLost: boolean;
    isAnswerRight?: boolean;
    isSkip?: boolean;
}

class GameService {

    async readRandomTests(category: OperationCategory, count: number) {
        if (!category) {
            throw ApiError.BadRequest()
        }
        if (category === OperationCategory.All) {
            return await TestModel.aggregate([{$sample: {size: count}}]) as ITestFromMongo[];
        }
        return await TestModel.aggregate([{$match: {category}}, {$sample: {size: count}}]) as ITestFromMongo[];
    }

    async getTestById(testId: string) {
        return await TestModel.findById(testId).exec()
    }


    async getRightAnswer({answerId, testId}: {testId: string, answerId: string|number}) {
        const test = await gameService.getTestById(testId);
        return test.answer;
    }

    checkAnswer ({answerId, rightAnswer}: {rightAnswer: string|number, answerId: string|number}) {
        return  String(rightAnswer) === String(answerId);
    }

    checkNextLevel ({currentTestNumber, isLost, isLastLevel}: CheckNextLevel) {
        if (isLost || isLastLevel) {
            return false
        }
        return (currentTestNumber > TEST_COUNT - 2); 
    }

    checkLost ({isAnswerRight, lives, skips, isSkip}: {isAnswerRight: boolean, lives: number, skips: number, isSkip?: boolean}) {
        if (isSkip && skips) {
            return false;
        }

        return lives - (isAnswerRight ? 0 : 1) < 0;
    }

    getTestNumber ({isLastLevel, isLastTest, isLost, oldGame}: GamePropsFound) {
        if (isLost) {
            return 0;
        }
        if (isLastLevel && isLastTest ) {
            return TEST_COUNT - 1;
        }
        if (isLastTest) {
            return 0;
        }
        return oldGame.currentTestNumber + 1;
    }

    getGameLevel ({isLastLevel, isLastTest, isLost, oldGame}: GamePropsFound) {
        const {level} = oldGame;
        if (isLost) {
            return level;
        }
        if (isLastLevel) {
            return level;
        }
        if (isLastTest) {
            return level + 1;
        }
        return level;
    }

    getLives ({isLastLevel, isLastTest, isLost, oldGame, isAnswerRight, isSkip }: GamePropsFound) {
        const {lives, level} = oldGame;
        if (isLost) {
            return 0;
        }

        if (isLastLevel && isLastTest) {
            return 0;
        }
        if (isLastTest) {
            return getLivesPassesByLvl(level+1).lives;
        }
        if (isSkip) {
            return lives;
        }
        if (!isAnswerRight) {
            return lives - 1;
        }
        return lives;
    }
    

    getSkips ({isLastLevel, isLastTest, isLost, oldGame, isSkip}: GamePropsFound) {
        const {skips, level} = oldGame;
        if (isLost) {
            return 0;
        }
        if (isLastLevel && isLastTest) {
            return 0;
        }
        if (isLastTest) {
            return getLivesPassesByLvl(level+1).skips;
        }
        if (isSkip) {
            return skips - 1;
        }
        return skips;
    }

    getPoints ({isLastTest, isLost, oldGame, isAnswerRight}: GamePropsFound) {
        const {points, lives, skips} = oldGame;
        if (isLost) {
            return points;
        }
        if (isLastTest) {
            return points + lives + skips - 1 + (isAnswerRight ? 2 : 0);
        }
        return points + (isAnswerRight ? 1 : 0);
    }

    getTestResult({isAnswerRight, isSkip}:{isAnswerRight?: boolean, isSkip?: boolean}) {
        if (isSkip === true) {
            return TestResult.SKIP
        }
        return isAnswerRight ? TestResult.RIGHT : TestResult.WRONG;
    }

    getResults ({oldGame, isAnswerRight, isSkip}: GamePropsFound) {
        const {results} = oldGame;
        const result = this.getTestResult({isAnswerRight, isSkip});
        const lastResults = results[results.length-1];
        const areNewResults = lastResults.length === TEST_COUNT;
        if (areNewResults) {
            return [...results, [result]];
        }
        const newLastResults = [...lastResults, result];
        return [...results.slice(0, results.length - 1), newLastResults];
    }

    getStatus ({isLastLevel, isLastTest, isLost}: GamePropsFound) {
        if (isLost) {
            return GameStatus.Lost;
        }
        if (isLastLevel && isLastTest) {
            return  GameStatus.Won;
        }
        if (isLastTest) {
            return GameStatus.NextLevel;
        }
        return GameStatus.Active;
    }

    getGameOnAnswer ({isAnswerRight, userId}: {isAnswerRight: boolean, userId: string}) {
        const oldGame = localDbService.readGame(userId);
        const {currentTestNumber, level, lives, skips} = oldGame;
        const isLastLevel = level === MAX_LEVEL - 1;
        const isLastTest = TEST_COUNT === currentTestNumber + 1
        const isLost = this.checkLost({isAnswerRight, lives, skips})

        const game: SinglePlayerGame = {
            ...oldGame,
            currentTestNumber: this.getTestNumber({oldGame, isAnswerRight, isLastLevel, isLastTest, isLost}),
            level: this.getGameLevel({oldGame, isAnswerRight, isLastLevel, isLastTest, isLost}),
            lives: this.getLives({oldGame, isAnswerRight, isLastLevel, isLastTest, isLost}),
            skips: this.getSkips({oldGame, isAnswerRight, isLastLevel, isLastTest, isLost}),
            points: this.getPoints({oldGame, isAnswerRight, isLastLevel, isLastTest, isLost}),
            results: this.getResults({oldGame, isAnswerRight, isLastLevel, isLastTest, isLost}), 
            status: this.getStatus({oldGame, isAnswerRight, isLastLevel, isLastTest, isLost}),
        }
        return game;
    }

    getGameOnSkip ({ userId }: {userId: string}) {
        const oldGame = localDbService.readGame(userId);
        const {skips, currentTestNumber, level, } = oldGame;
        if (!skips) {
            return oldGame;
        }
        const isSkip = true;
        const isLastLevel = level === MAX_LEVEL - 1;
        const isLost = false;
        const isLastTest = TEST_COUNT === currentTestNumber + 1

        const game: SinglePlayerGame = {
            ...oldGame,
            currentTestNumber: this.getTestNumber({oldGame, isLastLevel, isLastTest, isLost, isSkip}),
            level: this.getGameLevel({oldGame, isSkip, isLastLevel, isLastTest, isLost}),
            lives: this.getLives({oldGame, isSkip, isLastLevel, isLastTest, isLost}),
            skips: this.getSkips({oldGame, isSkip, isLastLevel, isLastTest, isLost}),
            points: this.getPoints({oldGame, isSkip, isLastLevel, isLastTest, isLost}),
            results: this.getResults({oldGame, isSkip, isLastLevel, isLastTest, isLost}), 
            status: this.getStatus({oldGame, isSkip, isLastLevel, isLastTest, isLost}),
        }
        return game;
    }

    async startGameHandler({category, userId}: StartGame) {
        const game = localDbService.createGame({category, userId});
        const tests = await this.readRandomTests(category, TEST_COUNT);
        return {game, tests}
    }

    async checkAnswerHandler ({answerId, gameId, testId, userId}: CheckAnswer) {
        const rightAnswer = await this.getRightAnswer({answerId, testId})
        const isAnswerRight = this.checkAnswer({rightAnswer, answerId})
        const game = this.getGameOnAnswer({isAnswerRight, userId});
        localDbService.updateGame({gameId, userId, updateData: game})
        return {game, rightAnswer}
    }

    async skipTestHandler ({gameId, userId}: {gameId: string, userId: string}) {
        const game = this.getGameOnSkip({userId});
        localDbService.updateGame({gameId, userId, updateData: game})
        return game;
    }

    //for new lvl
    async getTests({category}: StartGame) {
        const tests = await this.readRandomTests(category, TEST_COUNT);
        return tests;
    }

    async exitGameHandler ({ userId}: {userId: string }) {
        const game = localDbService.readGame(userId);
        const {category, gameId, points} = game 
        await gameResultService.saveGame({ category, points, type: GameType.SinglePlayer, userId, gameId, status: GameStatus.Exit })
    }

    async saveGameResult (game: SinglePlayerGame) {
        const {category, gameId, points, status, userId} = game;
        if ([GameStatus.Won, GameStatus.Lost].includes(status)) {
            await gameResultService.saveGame({ category, points, type: GameType.SinglePlayer, userId, gameId, status })
        }
    }
}

export const gameService = new GameService();