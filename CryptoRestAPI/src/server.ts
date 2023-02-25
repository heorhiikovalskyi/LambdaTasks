import express from "express";
import { router } from "./routes/UpdateRatesAndSendRates.js";
import { ErrorHandler } from "./controllers/ExchangeRates.js";
const app = express();
app.use(express.json());
const PORT = 3000;

app.listen(PORT);
app.use(router);
app.use(ErrorHandler);
