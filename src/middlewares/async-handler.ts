import { NextFunction, Request, Response } from "express";

type ResolveFnType = (req: Request, res: Response, next: NextFunction) => unknown;
type AsyncHandlerType = (fn: ResolveFnType) => (req: Request, res: Response, next: NextFunction) => unknown;

export const asyncHandler: AsyncHandlerType = (fn) => (req, res, next) => {
    return Promise.resolve(fn(req, res, next)).catch((err) => {
        console.error('/==> ', {err}, ' <==/');
        next(err)
    })
}