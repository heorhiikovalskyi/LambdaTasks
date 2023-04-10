import cron from "node-cron";
import { updateDb } from "./controllers/exchangeRates.js";
export const updateExchangeRates = cron.schedule("*/5 * * * *", updateDb);
