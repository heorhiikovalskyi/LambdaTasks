import express from "express";
import { MongoClient } from "mongodb";

import "dotenv/config.js";
import { connectToDb } from "./connectToDb.js";
import { authRouter } from "./routers/authRouter.js";
import { businessLogicRouter } from "./routers/businessLogicRouter.js";
const { MONGO_SERVER_URL, PORT } = process.env;
const mongoClient = new MongoClient(MONGO_SERVER_URL);
await connectToDb(mongoClient);
const app = express();
app.use(express.json());
app.use(authRouter);
app.use(businessLogicRouter);
app.listen(PORT);
