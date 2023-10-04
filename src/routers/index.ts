import { Router } from "express";
import { moviesRouter } from "./movies";
import { userRouter } from "./user";
import { testsRouter } from "./tests";


const router = Router();

router.use('/movies', moviesRouter);
router.use('/users', userRouter);
router.use('/tests', testsRouter);

export {router}