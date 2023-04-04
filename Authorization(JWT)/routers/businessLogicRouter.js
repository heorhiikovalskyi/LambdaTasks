import express from "express";
import { getMockData } from "../controllers/businessLogic.js";
import { validUser } from "../controllers/businessLogic.js";
const businessLogicRouter = express.Router();
businessLogicRouter.get(/\/me[0-9]/, validUser, getMockData);
export { businessLogicRouter };
