
export const TEST_COUNT = 5;
export const MAX_LEVEL = 5;
export const MISTAKES_PER_TEST = /*0.4*/ 0.8;
  
  
export const enum TestResult { 
    RIGHT = 'RIGHT',
    WRONG = 'WRONG',
    SKIP = 'SKIP'
  }

export const enum GameType {
  SinglePlayer = 'SinglePlayer',
  SinglePlayerTime = 'SinglePlayerTime',
  MultiPlayer = 'MultiPlayer',
}

export const GAME_TYPES = [GameType.MultiPlayer, GameType.SinglePlayer, GameType.SinglePlayerTime]