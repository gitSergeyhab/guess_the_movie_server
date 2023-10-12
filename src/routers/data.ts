import { Router } from "express";
import { asyncHandler } from "../middlewares/async-handler";
import { dataController } from "../controllers/data-controller";

const dataRouter  = Router();

dataRouter.post('/', asyncHandler(dataController.writeDataToDB));
dataRouter.delete('/:category/:content', asyncHandler(dataController.deleteDataFromDB));
dataRouter.get('/', asyncHandler(dataController.readDataFromDB));

export {dataRouter}