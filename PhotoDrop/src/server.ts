import express from "express";
import "dotenv/config.js";
import { photographerRouter } from "./routers/photographerRouter.js";

const { PORT } = process.env;

const app = express();

app.use(express.json());

app.use(photographerRouter);

//app.use(errorHandler);

app.listen(PORT);
