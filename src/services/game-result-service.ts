import { OperationCategory } from "../const/admin-const";
import { GameType } from "../const/game-const";
import { GameResultModel } from "../models/game-result";
import { IGameResult } from "../types/game-result-types";


const mongoQueryGameResult= {$group: 
    { _id:  {category: "$category", type: "$type"}}
}

export const enum SortFields {
    Points = 'points',
    UserId = 'userId',
    Category = 'category',
    Type = 'type'
}

interface GetGameResultsByCategoryAndType {
    category: OperationCategory;
    type: GameType;
    limit: number;
    offset: number;
    sort: SortFields;
    order: 1|-1
}

interface GetGameResultsByUser {
    userId: string;
    limit: number;
    offset: number;
    sort: SortFields;
    order: 1|-1
}

class GameResultService {
    async saveGame({category, points, type, userId, gameId, status}: IGameResult) {
        await GameResultModel.collection.insertOne({category, points, type, userId, gameId, status})
    }

    async getGameResultsByCategoryAndType(
        {category, type, limit=20, offset=0, order=-1, sort=SortFields.Points}: 
        GetGameResultsByCategoryAndType
        ) {
        return await GameResultModel
            .find({ category, type })
            .sort({ [sort]: order })
            .skip(offset).limit(limit)
            .exec() as IGameResult[]
    }

    async getGameResultsByUser({limit, offset, userId, order=-1, sort=SortFields.Points}: GetGameResultsByUser) {
        return await GameResultModel
            .find({ userId })
            .sort({ [sort]: order })
            .skip(offset).limit(limit)
            .exec() as IGameResult[]
    }


    async getTopResultsByAlGames (limit: number) {
        return await GameResultModel.aggregate([mongoQueryGameResult, {$limit: limit}])
    }
    
    // async getGameResultsByUser(userId: string) {
    //     return await GameResultModel.find({ userId }).exec() as IGameResult[]
    // }
}


export const gameResultService = new GameResultService()