import cron from "node-cron";
import { UpdateDB } from "./controllers/ExchangeRates.js";
export const updateExchangeRates = cron.schedule("*/5 * * * *", UpdateDB);
