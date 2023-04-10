import TelegramBot from "node-telegram-bot-api";
import "dotenv/config.js";
import { commandsToDisplayInMenu } from "./Commands.js";
import {
  HelloUser,
  HelpUser,
  ListRecent,
  ShowDetailedCurrencyInfo,
  AddCurrencyInFavourites,
  ListFavourite,
  DeleteCurrencyFromFav,
} from "./controllers/TelegramBot.js";
const { TELEGRAM_API_TOKEN } = process.env;
export const bot = new TelegramBot(TELEGRAM_API_TOKEN!, {
  polling: true,
});

bot.setMyCommands(commandsToDisplayInMenu);

bot.on("callback_query", (query) => {
  if (query.data?.startsWith("Add")) {
    const currency = query.data.slice(3);
    AddCurrencyInFavourites(query.message!, currency);
  } else if (query.data?.startsWith("Delete")) {
    const currency = query.data.slice(6);
    DeleteCurrencyFromFav(query.message!, currency);
  }
  bot.answerCallbackQuery(query.id);
});

bot.on("message", (msg) => {
  const command = msg.text?.toLowerCase();
  if (command === "/start") HelloUser(msg);
  else if (command === "/help") HelpUser(msg);
  else if (command === "/list_recent") ListRecent(msg);
  else if (command?.startsWith("/addtofavourite")) AddCurrencyInFavourites(msg, msg.text!.slice(15).trim());
  else if (command === "/listfavourite") ListFavourite(msg);
  else if (command?.startsWith("/deletefavourite")) DeleteCurrencyFromFav(msg, msg.text!.slice(16).trim());
  else if (command!.length > 1) ShowDetailedCurrencyInfo(msg, msg.text!.slice(1));
});
