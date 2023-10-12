import { Response } from "express";
import { AuthRequest } from "../types/users";
// import { transformDataService } from "../services/data-services/transform-data-service";
// import { Movie } from "../types/movie-types";
// import { PersonQuestionService } from "../services/question-services/person-question-service";
// import { moviesIMDB } from "../data/movies-imdb/movies-imdb";
// import { rusMovies } from "../data/rus/rus-movies";
// import { ussrMovies } from "../data/ussr/ussr-movies";
// import { writeDataService } from "../services/data-services/write-data-service";
import { StatusCode } from "../const";
import { ApiError } from "../middlewares/error-middleware";
import { ErrorMessages } from "../messages/error-messages";
// import { kinopoiskApiDataService } from "../services/data-services/kinipoisk-api-data-service";
import { AdminDataRequestQuery } from "../types/admin-types";
// import { kinopoiskApiDataService } from "../services/kinopoisk-api-service";
// import { transformDataService } from "../services/transform-data-service";
import { dataService } from "../services/data-service";
import { transformDataService } from "../services/transform-data-service";
import { OperationAction, OperationCategory, OperationContent } from "../const/admin-const";
import { MovieWithCategory, MovieWithImageList } from "../types/movie-types";
import { testService } from "../services/tests-services/tests-service";
import { shuffleArray } from "../utils/utils";
import { getRandomUniqueArray } from "../utils/test-utils";



class DataController {

    async readDataFromDB (req: AuthRequest, res: Response) {

        try {
            const {query: q} = req;
            // const query = q as unknown as AdminDataRequestQuery;
            // const data = await dataService.readDataFromDb({
            //     action: OperationAction.Write,
            //     category: OperationCategory.Ussr,
            //     content: OperationContent.Images
            // });


            // return res.status(StatusCode.Added).json((data as MovieWithCategory[])
            //     // .map(({name, slogan, budget, id}) => ({ name, id }))
            //     )

            const category = OperationCategory.Ussr;
            const tests = await testService.createTests(category);
            const testSet = shuffleArray(getRandomUniqueArray(tests, 13))
            return res.status(StatusCode.Added).json({testSet})
        } catch (err) {
            console.error({err})
            const {message} = err
            throw new ApiError(StatusCode.ServerError, message || ErrorMessages.ServerError)
        }
    }
    async writeDataToDB (req: AuthRequest, res: Response) {

        try {
            const {query: q} = req;
            const query = q as unknown as AdminDataRequestQuery;
            await dataService.writeDataToDb(query);
            return res.status(StatusCode.Added).json('Данные были добавлены')
        } catch (err) {
            console.error({err})
            const {message} = err
            throw new ApiError(StatusCode.ServerError, message || ErrorMessages.ServerError)
        }
    }

    async deleteDataFromDB (req: AuthRequest, res: Response) {

        try {
            const {query, params: p} = req;
            const params = p as unknown as AdminDataRequestQuery;
            console.log({query, params} , 'deleteDataFromDB')
            await dataService.deleteDataFromDb(params);
            return res.status(StatusCode.Deleted).json('Данные были удалены')

        } catch (err) {
            console.error({err})
            const {message} = err
            throw new ApiError(StatusCode.ServerError, message || ErrorMessages.ServerError)
        }
    }

}


export const dataController = new DataController()