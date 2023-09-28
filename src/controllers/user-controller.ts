import { Request, Response } from "express";
import { StatusCode } from "../const";

class UserController {
    registration(req: Request, res: Response) {
       
        const body = req.body;
        console.log({body})
        const message = {...body, fromServer: true}
        return res.status(StatusCode.Added).json({message})
    }
}

export const userController = new UserController()