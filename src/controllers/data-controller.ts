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



class DataController {
    async writeDataToDB (req: AuthRequest, res: Response) {

        try {
            const {query, params} = req;
            console.log({query, params} , 'writeDataToDB')

            return res.status(StatusCode.Added).json('Данные были добавлены')

        } catch (err) {
            console.error({err})
            const {message} = err
            throw new ApiError(StatusCode.ServerError, message || ErrorMessages.ServerError)
        }
    }

    async deleteDataFromDB (req: AuthRequest, res: Response) {

        try {
            const {query, params} = req;
            console.log({query, params} , 'deleteDataFromDB')

            return res.status(StatusCode.Deleted).json('Данные были удалены')

        } catch (err) {
            console.error({err})
            const {message} = err
            throw new ApiError(StatusCode.ServerError, message || ErrorMessages.ServerError)
        }
    }

}


export const dataController = new DataController()