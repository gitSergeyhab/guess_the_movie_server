import { OperationCategory } from "../const/admin-const";
import { TestModel } from "../models/tests";
import { CheckAnswerForSinglePlayer } from "../types/game-types";







class GameService {

    async readRandomTests(category: OperationCategory, count: number) {
        if (category === OperationCategory.All) {
            return await TestModel.aggregate([{$sample: {size: count}}])
        }
        return await TestModel.aggregate([{$match: {category}}, {$sample: {size: count}}])
    }

    async getTestById(testId: string) {
        return await TestModel.findById(testId).exec()
    }


}


export const gameService = new GameService();