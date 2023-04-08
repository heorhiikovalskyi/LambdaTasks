import "dotenv/config.js";
import TelegramBot from "node-telegram-bot-api";
import {
  start,
  chooseForecast,
  chooseBank,
  sendMonoExchanges,
  sendWeather,
  sendPrivatExchanges,
} from "./controllers/telegramBot.js";
import { updateMonoExchanges } from "./controllers/telegramBot.js";
const { TELEGRAM_TOKEN } = process.env;

await updateMonoExchanges();
setInterval(() => updateMonoExchanges(), 330000);

const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });

bot.onText(/Кожні (3|6) годин/i, (msg) => sendWeather(msg));

bot.onText(/^Privat/i, (msg) => sendPrivatExchanges(msg));

bot.onText(/^Mono/i, (msg) => sendMonoExchanges(msg));

bot.onText(/^Курс/i, (msg) => chooseBank(msg));

bot.on("polling_error", console.log);

bot.onText(/^Прогноз/i, (msg) => chooseForecast(msg));

bot.onText(/\/start/, (msg) => start(msg));

bot.onText(/^Повернутись/i, (msg) => start(msg));
