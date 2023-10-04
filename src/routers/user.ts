import { Router } from "express";
import { userController } from "../controllers/user-controller";
import { asyncHandler } from "../middlewares/async-handler";
import { authMiddleware } from "../middlewares/auth-middleware";

const userRouter = Router();

userRouter.post('/registration', asyncHandler(userController.registration));
userRouter.post('/login', asyncHandler(userController.login));
userRouter.get('/', authMiddleware, asyncHandler(userController.getAllUsers));
// userRouter.get('/', authMiddleware, asyncHandler(userController.readMovieDataFromKPToList));

userRouter.get('/auth', asyncHandler(userController.checkAuth));
userRouter.get('/work', asyncHandler(userController.getWorkData));





export {userRouter}