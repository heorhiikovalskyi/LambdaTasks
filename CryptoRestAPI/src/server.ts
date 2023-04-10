import express from "express";
import { errorHandler } from "./controllers/exchangeRates.js";
import { GetExchangeRates, sendCurrencies } from "./controllers/exchangeRates.js";
import { updateExchangeRates } from "./cron-ping.js";
import "dotenv/config.js";
const { PORT } = process.env;
updateExchangeRates.start();
const app = express();
app.use(express.json());
app.get("/exchangeRates", GetExchangeRates);
app.get("/currencies", sendCurrencies);
app.use(errorHandler);
app.listen(PORT);
