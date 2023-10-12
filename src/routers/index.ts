import { Router } from "express";
import { moviesRouter } from "./movies";
import { userRouter } from "./user";
import { testsRouter } from "./tests";
import { dataRouter } from "./data";
import { statsRouter } from "./stats";


const router = Router();

router.use('/movies', moviesRouter);
router.use('/users', userRouter);
router.use('/tests', testsRouter);
router.use('/data', dataRouter);
router.use('/stats', statsRouter);

export {router}