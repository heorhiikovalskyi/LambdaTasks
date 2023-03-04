import express from "express";
import {
  GetExchangeRates,
  GetCurrencies,
} from "../controllers/ExchangeRates.js";
import { updateExchangeRates } from "../cron-ping.js";
updateExchangeRates.start();
const router = express.Router();

router.get("/exchangeRates", GetExchangeRates);
router.get("/Currencies", GetCurrencies);

export { router };
