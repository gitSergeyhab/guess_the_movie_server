import { OperationCategory } from "../const/admin-const";
import { GameType } from "../const/game-const";
import { GameStatus } from "./game-types";

export interface IGameResult {
    gameId: string;
    type: GameType;
    category: OperationCategory;
    userId: string;
    points: number;
    status: GameStatus
}