import { Request, Response } from "express";
import { MovieType, StatusCode } from "../const";
import { AuthRequest, UserLoginData, UserRegistrationData } from "../types/users";
import { checkData } from "../services/check-data";
import { ApiError } from "../middlewares/error-middleware";
import { tokenService } from "../services/token-service";
import { userService } from "../services/user-service";
import { ErrorMessages } from "../messages/error-messages";
// import { imagesByMovieData, 
//     frameFromTheMovie5Question,
//     pushAllData, imagesByMovieDataStats, ussrActors,ussrActorSortList,
//     wordActorSortList, worldPopularPersons, uniqueMovies, allMovies,
//     worldPersonWithMoviesId,
//     different4MovieImages1, different4MovieImages2, different3MovieImages1, different3MovieImages2, different5MovieImages1, different5MovieImages2
//  } from "../services/work-services";
import { readDataService } from "../services/data-services/read-data-service";
import { images2 } from "../data/images/images2";
import { transformDataService } from "../services/data-services/transform-data-service";
import { rusMovies } from "../data/rus/rus-movies";
import { ussrMovies } from "../data/ussr/ussr-movies";
import { PersonQuestionService } from "../services/question-services/person-question-service";
import { moviesIMDB } from "../data/movies-imdb/movies-imdb";
import { Movie } from "../types/movie-types";

const imagesDataList = []
class UserController {
    async registration(req: Request, res: Response) {
        try {
            const body = req.body as UserRegistrationData;
            if (!checkData.checkRegistrationData(body)) {
                throw ApiError.BadRequest(ErrorMessages.BadRequest)
            }
            const {password, username} = body;
            await userService.createUser({password, username})
            return res.status(StatusCode.Added).json({message: `игрок ${username} успешно создан`});
        } catch (err) {
            const {message} = err;
            throw new ApiError(StatusCode.ServerError, message || ErrorMessages.ServerError)
        }
    }

    async login(req: Request, res: Response) {
        try {
            const body = req.body as UserLoginData;
            if (!checkData.checkLoginData(body)) {
                throw  ApiError.BadRequest(ErrorMessages.BadRequest)
            }
            const {password, username} = body;
            const userData = await userService.GetUserByLoginData({password, username})
            const token = tokenService.createToken(userData.name, userData.userId);
            return res.status(StatusCode.Ok).json({token, user: userData});
        } catch (err) {
            const {message} = err;
            throw new ApiError(StatusCode.ServerError, message || ErrorMessages.ServerError)
        }
    }

    async checkAuth(req: AuthRequest, res: Response) {
        try {
            console.log('checkAuth Try Start')
            const token = req.headers.authorization;
            tokenService.checkToken(token);
            console.log('checkAuth Try End')
            return res.status(StatusCode.Ok).json('OK');
        } catch (err) {
            console.log('checkAuth Try Err', {err})

            throw ApiError.UnauthorizedError()
        }
    }

    
    // async getAllUsers(req: AuthRequest, res: Response) {
    //     try {
    //         console.log(req.user, 'req.user');
    //         const users = await userService.getAllUsers()
    //         return res.status(StatusCode.Ok).json(users);
    //     } catch (err) {
    //         const {message} = err;
    //         throw new ApiError(StatusCode.ServerError, message || ErrorMessages.ServerError)
    //     }
    // }

    async getAllUsers(req: AuthRequest, res: Response) {
        try {
            const persons = transformDataService.getPersonsFromMovies(moviesIMDB as Movie[], 7) 
            const rusPersonQuestionService = new PersonQuestionService(persons);
            const startTime = performance.now()
            const question = rusPersonQuestionService.getTestsGuessPersonByMovie(1, 5);
            const endTime = performance.now()
            console.log(`Call to doSomething took ${endTime - startTime} milliseconds_________!!!`)
            return res.status(StatusCode.Ok).json(question);
        } catch (err) {
            const {message} = err;
            throw new ApiError(StatusCode.ServerError, message || ErrorMessages.ServerError)
        }
    }
    // 1t
    //0.28
    //0.09
    //0.15

    // 100t (count -> X100; T -> X4/x3)
    //0.89
    //0.29
    //0.68

    // 10000t (count -> X100; T-> X30)
    //21.8
    //19.2
    //16.4

    //1000t (count -> X10; T -> X7)
    //6.8
    //2.5
    //4.7
    async readMovieDataFromKPToList(req: AuthRequest, res: Response) {
        try {
            const items = await readDataService.readMovieData(1000, MovieType.Movie)
            // const movies = await readDataService.readMovieData(1000, MovieType.Movie);
            imagesDataList.push(...items);
            return res.status(StatusCode.Ok).json('Ok');
        } catch (err) {
            const {message} = err;
            throw new ApiError(StatusCode.ServerError, message || ErrorMessages.ServerError)
        }
    }

    async readImageDataFromKPToList(req: AuthRequest, res: Response) {
        try {
            const movieIndexes = moviesIMDB.map((item) => item.id);
            // const movieIndexes = rusMovies.docs.map((item) => item.id);
            // const movieIndexes = ussrMovies.docs.map((item) => item.id);
            const images = await readDataService.readImageData(movieIndexes)
            imagesDataList.push(...images)
            return res.status(StatusCode.Ok).json('Ok');
        } catch (err) {
            const {message} = err;
            throw new ApiError(StatusCode.ServerError, message || ErrorMessages.ServerError)
        }
    }

    // async getWorkDateImagesPushRequest(req: AuthRequest, res: Response) {
    //     try {
    //         console.log(req.user, 'req.user');
    //         const  images = await pushAllData()
    //         console.log({images})
    //         return res.status(StatusCode.Ok).json(images);
    //     } catch (err) {
    //         const {message} = err;
    //         throw new ApiError(StatusCode.ServerError, message || ErrorMessages.ServerError)
    //     }
    // }

    async getWorkData(req: AuthRequest, res: Response) {
        try {
            return res.status(StatusCode.Ok).json(
                {
                    imagesDataList
                }
                );
        } catch (err) {
            const {message} = err;
            throw new ApiError(StatusCode.ServerError, message || ErrorMessages.ServerError)
        }
    }

    // для старта / теста
    // async addDefaultUsers(req: Request, res: Response) {
    //     try {
    //         await userService.createDefaultUsers();
    //         // await userService.createBadDefaultUsers();

    //         return res.status(StatusCode.Ok).json('ok');
    //     } catch (err) {
    //         const {message} = err;
    //         throw new ApiError(StatusCode.ServerError, message || ErrorMessages.ServerError)
    //     }
    // }
}

export const userController = new UserController()