import cron from "node-cron";
import { updateDb } from "./controllers/app.js";
export const updateExchangeRates = cron.schedule("*/5 * * * *", updateDb);
