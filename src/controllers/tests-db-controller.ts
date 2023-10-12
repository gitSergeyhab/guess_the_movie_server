import { Response } from "express";
import { AuthRequest } from "../types/users";
import { StatusCode } from "../const";
import { ApiError } from "../middlewares/error-middleware";
import { ErrorMessages } from "../messages/error-messages";



class TestsDBController {

    async writeTestsToDB (req: AuthRequest, res: Response) {
        try {
            const {query, params} = req;
            console.log({query, params} , 'writeTestsToDB')

            
            return res.status(StatusCode.Added).json('Тесты были добавлены')

        } catch (err) {
            console.error({err})
            const {message} = err
            throw new ApiError(StatusCode.ServerError, message || ErrorMessages.ServerError)
        }
    }

    async deleteTestsFromDB (req: AuthRequest, res: Response) {

        try {
            const {query, params} = req;
            console.log({query, params} , 'deleteTestsFromDB')

            return res.status(StatusCode.Deleted).json('Тесты были удалены')

        } catch (err) {
            console.error({err})
            const {message} = err
            throw new ApiError(StatusCode.ServerError, message || ErrorMessages.ServerError)
        }
    }


 
}


export const testsDBController = new TestsDBController()