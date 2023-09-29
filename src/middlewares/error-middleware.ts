import { NextFunction, Request, Response } from "express";
import { StatusCode } from "../const";

export class ApiError extends Error {
    status: number;
    errors: string[];
    message: string;

    constructor (status: number, message: string, errors: string[] = []) {
        const messageStr = typeof message === 'string' ? message : JSON.stringify(message);
        super(messageStr);
        this.status = status;
        this.errors = errors;
    }

    static UnauthorizedError() {
        return new ApiError(401, 'You are Unauthorized')
    }

    // static ForbiddenError() {
    //     return new ApiError(403, 'access denied')
    // }

    static BadRequest(message: string, errors: string[] = []) {
        return new ApiError(400, message, errors)
    }

    static NotFound(message: string, errors: string[] = []) {
        return new ApiError(404, message, errors)
    }
}

export const errorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ApiError) {
        const {errors: errs, message, status} = err;
        const errors = errs.length ? errs : [message];
        return res.status(status).json({message, errors})
    }
    return res.status(StatusCode.ServerError).json({message: err.message || 'SERVER ERROR. TRY AGAIN LATER'})
}