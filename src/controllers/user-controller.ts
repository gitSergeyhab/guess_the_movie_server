import { Request, Response } from "express";
import { StatusCode } from "../const";
import { UserLoginData, UserRegistrationData } from "../types/users";
import { checkData } from "../services/check-data";
import { ApiError } from "../middlewares/error-middleware";
import { tokenService } from "../services/token-service";
import { userService } from "../services/user-service";
import { ErrorMessages } from "../messages/error-messages";


class UserController {
    async registration(req: Request, res: Response) {
        try {
            const body = req.body as UserRegistrationData;
            if (!checkData.checkRegistrationData(body)) {
                throw new ApiError(StatusCode.BadRequest, ErrorMessages.BadRequest)
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
                throw new ApiError(StatusCode.BadRequest, ErrorMessages.BadRequest)
            }
            const {password, username} = body;
            const userData = await userService.GetUserByLoginData({password, username})
            const token = tokenService.createToken(userData.name);
            return res.status(StatusCode.Ok).json({token, user: userData});
        } catch (err) {
            const {message} = err;
            throw new ApiError(StatusCode.ServerError, message || ErrorMessages.ServerError)
        }
    }

    async getAllUsers(req: Request, res: Response) {
        try {
            const users = await userService.getAllUsers();
            return res.status(StatusCode.Ok).json(users);
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