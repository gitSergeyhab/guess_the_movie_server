import { Router } from "express";
import { asyncHandler } from "../middlewares/async-handler";
import { statsController } from "../controllers/stats-controller";

const statsRouter  = Router();


statsRouter.get('/data', asyncHandler(statsController.getDataStats));
statsRouter.get('/tests', asyncHandler(statsController.getTestStats));
export {statsRouter}