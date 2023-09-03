import express from "express";
import "dotenv/config.js";
import { errorHandler } from "./errorHandler.js";
import { getExchangeRates, sendCurrencies } from "./controllers/app.js";
import { updateExchangeRates } from "./cron-ping.js";
import { validateRequest } from "./validation.js";
const { PORT } = process.env;

updateExchangeRates.start();
const app = express();

app.use(express.json());

app.get("/exchangeRates", validateRequest, getExchangeRates);
app.get("/currencies", sendCurrencies);

app.use(errorHandler);

app.listen(PORT);
