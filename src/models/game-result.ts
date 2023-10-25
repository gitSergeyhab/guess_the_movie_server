import { Schema, model } from "mongoose";
import { IGameResult } from "../types/game-result-types";
import { TEST_CATEGORIES } from "../const/tests";
import { GAME_TYPES } from "../const/game-const";
import { GameStatus } from "../types/game-types";



const GameResultSchema = new Schema<IGameResult>({
    category: {type: String, enum: TEST_CATEGORIES, required: true},
    points: {type: Number, required: true},
    type: {type: String, enum: GAME_TYPES, required: true},
    userId: {type: String, required: true},
    gameId: {type: String, required: true},
    status: {type: String, enum: [GameStatus.Won, GameStatus.Lost] , required: true}
}, {timestamps: true})


export const GameResultModel = model('GameResult', GameResultSchema)