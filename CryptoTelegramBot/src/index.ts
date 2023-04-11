import TelegramBot from "node-telegram-bot-api";
import "dotenv/config.js";
import { commandsToDisplayInMenu } from "./Commands.js";
import {
  helloUser,
  helpUser,
  listRecent,
  showDetailedCurrencyInfo,
  addCurrencyInFavourites,
  listFavourite,
  deleteCurrencyFromFav,
} from "./controllers/TelegramBot.js";
const { TELEGRAM_API_TOKEN } = process.env;
export const bot = new TelegramBot(TELEGRAM_API_TOKEN!, {
  polling: true,
});

bot.setMyCommands(commandsToDisplayInMenu);

bot.on("callback_query", (query) => {
  const { data, message, id } = query;
  if (data?.startsWith("Add")) {
    const currency = data.slice(3);
    addCurrencyInFavourites(message!, currency);
  } else if (data?.startsWith("Delete")) {
    const currency = data.slice(6);
    deleteCurrencyFromFav(message!, currency);
  }
  bot.answerCallbackQuery(id);
});

bot.on("message", (msg) => {
  const command = msg.text?.toLowerCase();
  const { text } = msg;
  if (command === "/start") {
    helloUser(msg);
  } else if (command === "/help") {
    helpUser(msg);
  } else if (command === "/list_recent") {
    listRecent(msg);
  } else if (command?.startsWith("/addtofavourite")) {
    const currency = text!.slice(15).trim();
    addCurrencyInFavourites(msg, currency);
  } else if (command === "/listfavourite") {
    listFavourite(msg);
  } else if (command?.startsWith("/deletefavourite")) {
    const currency = text!.slice(16).trim();
    deleteCurrencyFromFav(msg, currency);
  } else if (command!.length > 1) {
    const currency = text!.slice(1);
    showDetailedCurrencyInfo(msg, currency);
  }
});
