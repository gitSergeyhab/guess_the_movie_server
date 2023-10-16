import { SinglePlayerGame } from "./types/game-types"

export interface SinglePlayerGameStore {
    [userId: number]: SinglePlayerGame
  }

export const singlePlayerGameStore: SinglePlayerGameStore = {}