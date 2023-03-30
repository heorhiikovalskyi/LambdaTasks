import express from "express";
import "dotenv/config.js";
import { ConnectToDB } from "./DBConnect.js";
import { router } from "../routes/SendAndGetJSON.js";
import { ErrorHandlerIfNotJSON } from "../controllers/StoreJSONfromUserController.js";
await ConnectToDB(process.env.MONGO_SERVER_URL!);

const app = express();
app.use(express.json());
const PORT = 3000;

app.listen(PORT);
app.use(router);
app.use(ErrorHandlerIfNotJSON);
