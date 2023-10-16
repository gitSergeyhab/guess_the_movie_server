import { MAX_LEVEL, MISTAKES_PER_TEST, TEST_COUNT } from "../const/game-const";

  
export const getLivesPassesByLvl = (lvl: number) => {
    if (lvl >= MAX_LEVEL /* -1 */) {
        return {lives: 0, skips: 0};
    }

    const maxMistakeCount = TEST_COUNT * MISTAKES_PER_TEST;
    const mistakes = (MAX_LEVEL - lvl) / MAX_LEVEL * maxMistakeCount;

    return {lives: Math.floor(mistakes), skips: Math.round(mistakes) || 1};
} 