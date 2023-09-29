import { Router } from "express";
import { moviesRouter } from "./movies";
import { userRouter } from "./user";


const router = Router();

router.use('/movies', moviesRouter);
router.use('/users', userRouter);

export {router}