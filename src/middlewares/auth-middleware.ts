import { Response, NextFunction } from "express";
import { AuthRequest } from "../types/users";
import { ApiError } from "./error-middleware";
import { tokenService } from "../services/token-service";


export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    if (req.method === 'OPTIONS') {
        return next();
    } 

    try {
        const token = req.headers.authorization;
        if (!token) {
            console.error('authorization token does not exist')
            throw ApiError.UnauthorizedError();
        }
        const userJWT = tokenService.checkToken(token);
        console.log({userJWT})
        req.user = userJWT
        return next()
    } catch (err) {
        console.error({err})
        throw ApiError.UnauthorizedError();
    }  
}