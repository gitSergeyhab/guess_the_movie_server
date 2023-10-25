import { OperationCategory } from "../const/admin-const";
import { TestResult } from "../const/game-const";

export interface CheckAnswerForSinglePlayer {
    answerId: string;
    testId: string
  }


export const enum GameStatus {
  Won = 'Won',
  Lost = 'Lost',
  Active = 'Active',
  Hold = 'Hold',
  NextLevel = 'NextLevel',
  Error = 'Error',
  None = 'None',
  Starting = 'Starting',
  Exit = 'Exit'
}


export interface SinglePlayerGame {
  userId: string;
  gameId: string;
  category: OperationCategory;
  level: number;
  status: GameStatus;
  points: number;
  skips: number;
  lives: number;
  results: TestResult[][];
  currentTestNumber: number;
}

