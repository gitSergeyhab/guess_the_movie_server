import { Router } from "express";
import { asyncHandler } from "../middlewares/async-handler";
import { dataController } from "../controllers/data-controller";
import { statsController } from "../controllers/stats-controller";

const statsRouter  = Router();


statsRouter.get('/', asyncHandler(statsController.getStats));

export {statsRouter}