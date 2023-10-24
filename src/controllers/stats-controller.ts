import { Response } from "express";
import { AuthRequest } from "../types/users";
import { StatusCode } from "../const";
import { ApiError } from "../middlewares/error-middleware";
import { ErrorMessages } from "../messages/error-messages";
import { StatsCategoryCount, StatsTestCount, statsService } from "../services/stats-service";





const transformStats = (data: StatsCategoryCount[]) => data.reduce((acc, item) => {
    acc[item._id] = item.count
    return acc
}
,  {})


const transformTestStats = (data: StatsTestCount[]) => data.reduce((acc, item) => {
    const type = item._id.testType;
    const category = item._id.category;
    const count = item.count
    if (acc[type]) {
        acc[type] = {...acc[type], [category]: count}
    } else {
        acc[type] = {type, [category]: count}
    }
    return acc;
}, {} as {[type: string]: {type: string}})

class StatsController {
    async getDataStats(req: AuthRequest, res: Response) {
        try {
            const stats = await statsService.getDataStats();
            const adaptedStats = Object.entries(stats)
                .map(([key, value]) => ({content: key,  ...transformStats(value)}))

            return res.status(StatusCode.Ok).json(adaptedStats)
        } catch (err) {
            console.error({err})
            const {message} = err
            throw new ApiError(StatusCode.ServerError, message || ErrorMessages.ServerError)
        }
        
    }
    async getTestStats(req: AuthRequest, res: Response) {
        try {
            const stats = await statsService.getTestStats();

            const data = Object.values(transformTestStats(stats)) 
            console.log({data})
            return res.status(StatusCode.Ok).json(data)
        } catch (err) {
            console.error({err})
            const {message} = err
            throw new ApiError(StatusCode.ServerError, message || ErrorMessages.ServerError)
        }
        
    }
}

export const statsController = new StatsController()