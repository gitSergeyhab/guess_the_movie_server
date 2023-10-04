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
    async writeRusMovieTestsToDB (req: AuthRequest, res: Response) {

        try {
            // const {query, params} = req;
            const rusPersons = transformDataService.getPersonsFromMovies(rusMovies.docs , 7) 
            const rusPersonQuestionService = new PersonQuestionService(rusPersons);
            const ussrPersons = transformDataService.getPersonsFromMovies(ussrMovies.docs , 7) 
            const ussrPersonQuestionService = new PersonQuestionService(ussrPersons);
            const rusQuestion = rusPersonQuestionService.getTestsGuessPersonByMovie(500, 4);
            const ussrQuestion = ussrPersonQuestionService.getTestsGuessPersonByMovie(500, 4);

            await writeDataService.writeRusTestsToDB([...rusQuestion, ...ussrQuestion])
            return res.status(StatusCode.Added).json('Данные были добавлены')

        } catch (err) {
            console.error({err})
            const {message} = err
            throw new ApiError(StatusCode.ServerError, message || ErrorMessages.ServerError)
        }
    }


    // async writeGuessPersonByRusMovieTestsToDB (req: AuthRequest, res: Response) {

    //     try {
    //         const IMDBPersons = transformDataService.getPersonsFromMovies(moviesIMDB as Movie[], 7) 
    //         const IMDBPersonQuestionService = new PersonQuestionService(IMDBPersons);
    //         const rusPersons = transformDataService.getPersonsFromMovies(rusMovies.docs , 7) 
    //         const rusPersonQuestionService = new PersonQuestionService(rusPersons);
    //         const ussrPersons = transformDataService.getPersonsFromMovies(ussrMovies.docs , 7) 
    //         const ussrPersonQuestionService = new PersonQuestionService(ussrPersons);

    //         const question = rusPersonQuestionService.getTestsGuessPersonByMovie(1, 4);

    //     } catch (err) {

    //     }
    // }
}


export const testsDBController = new TestsDBController()