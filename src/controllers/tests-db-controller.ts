import { Response } from "express";
import { AuthRequest } from "../types/users";
import { StatusCode } from "../const";
import { ApiError } from "../middlewares/error-middleware";
import { ErrorMessages } from "../messages/error-messages";
import { AdminDataRequestQuery } from "../types/admin-types";
import { testService } from "../services/tests-services/tests-service";
import { mongoService } from "../services/mongo-service";
import { getRandomUniqueArray } from "../utils/test-utils";
import { shuffleArray } from "../utils/utils";
import { OperationCategory } from "../const/admin-const";



class TestsDBController {

    async writeTestsToDB (req: AuthRequest, res: Response) {
        try {
            const {query: q} = req;
            const query = q as unknown as AdminDataRequestQuery;


            const {category} = query;

            const movies = await mongoService.readMovies(category);
            const persons = await mongoService.readPersons(category);
            const movieImages = await mongoService.readMovieImages(category); 
            const tests = await testService.createTests({category, movieImages, movies, persons});
            
            console.log(tests.length, 'tests.length', {query}, tests[0]);

            await mongoService.writeTests(tests);

            
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
            const {category} = params;

            await mongoService.deleteTests(category as OperationCategory)

            return res.status(StatusCode.Deleted).json('Тесты были удалены')

        } catch (err) {
            console.error({err})
            const {message} = err
            throw new ApiError(StatusCode.ServerError, message || ErrorMessages.ServerError)
        }
    }


 
}


export const testsDBController = new TestsDBController()