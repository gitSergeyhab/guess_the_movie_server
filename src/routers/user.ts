import { Router } from "express";
import { userController } from "../controllers/user-controller";
import { asyncHandler } from "../middlewares/async-handler";

const userRouter = Router();

userRouter.post('/registration', asyncHandler(userController.registration));
userRouter.post('/login', asyncHandler(userController.login));
userRouter.get('/', asyncHandler(userController.getAllUsers));

export {userRouter}