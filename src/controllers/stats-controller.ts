import { Response } from "express";
import { AuthRequest } from "../types/users";
import { StatusCode } from "../const";
import { ApiError } from "../middlewares/error-middleware";
import { ErrorMessages } from "../messages/error-messages";
import { StatsCategoryCount, mongoService } from "../services/mongo-service";
import { OperationCategory, OperationContent } from "../const/admin-const";


const transformStats = (data: StatsCategoryCount[]) => data.reduce((acc, item) => {
    acc[item._id] = item.count
    return acc
}
,  {})

class StatsController {
    async getStats(req: AuthRequest, res: Response) {
        try {
            const stats = await mongoService.getStats();
            const adaptedStats = Object.entries(stats)
                .map(([key, value]) => ({content: key,  ...transformStats(value)}))

            return res.status(StatusCode.Ok).json(adaptedStats)
        } catch (err) {
            console.error({err})
            const {message} = err
            throw new ApiError(StatusCode.ServerError, message || ErrorMessages.ServerError)
        }
        
    }
}

export const statsController = new StatsController()