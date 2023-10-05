import { Response } from "express";
import { AuthRequest } from "../types/users";
import { transformDataService } from "../services/data-services/transform-data-service";
import { Movie } from "../types/movie-types";
import { PersonQuestionService } from "../services/question-services/person-question-service";
import { moviesIMDB } from "../data/movies-imdb/movies-imdb";
import { rusMovies } from "../data/rus/rus-movies";
import { ussrMovies } from "../data/ussr/ussr-movies";
import { writeDataService } from "../services/data-services/write-data-service";
import { StatusCode } from "../const";
import { ApiError } from "../middlewares/error-middleware";
import { ErrorMessages } from "../messages/error-messages";



class TestsDBController {
    // async writeTestsToDB (req: AuthRequest, res: Response) {

    //     try {
    //         const {query, params} = req;
    //         console.log({query, params} , 'writeTestsToDB')
    //         const rusPersons = transformDataService.getPersonsFromMovies(rusMovies.docs , 7) 
    //         const rusPersonQuestionService = new PersonQuestionService(rusPersons);
    //         const ussrPersons = transformDataService.getPersonsFromMovies(ussrMovies.docs , 7) 
    //         const ussrPersonQuestionService = new PersonQuestionService(ussrPersons);
    //         const rusQuestion = rusPersonQuestionService.getTestsGuessPersonByMovie(500, 4);
    //         const ussrQuestion = ussrPersonQuestionService.getTestsGuessPersonByMovie(500, 4);
    //         console.log(rusQuestion.length, ussrQuestion.length , 'writeTestsToDB')
    //         await writeDataService.writeRusTestsToDB([...rusQuestion, ...ussrQuestion])
    //         return res.status(StatusCode.Added).json('Тесты были добавлены')

    //     } catch (err) {
    //         console.error({err})
    //         const {message} = err
    //         throw new ApiError(StatusCode.ServerError, message || ErrorMessages.ServerError)
    //     }
    // }

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