import { bot } from "../index.js";
import TelegramBot from "node-telegram-bot-api";
import { commands } from "../Commands.js";
import { getAllCurrenciesAverageExchangeRates, getCurrencyAverageExchangeRate } from "../models/exchangeRate.js";
import { findChat, insertChat } from "../models/chat.js";
import { insertFavCurrency, getUserFavourites, deleteFavCur } from "../models/FavouriteCurrency.js";
import { messages } from "../messages.js";
const addToFavErrorHandler = (msg: TelegramBot.Message, err: any) => {
  try {
    const { errno, message } = err;
    const { id } = msg.chat;
    if (errno !== 19) {
      return console.log(err);
    }
    if (message.includes("UNIQUE", 0)) {
      bot.sendMessage(id, "currency is already in favoutires");
    } else if (message.includes("NOT NULL", 0)) {
      bot.sendMessage(id, "no such currency");
    }
  } catch (err) {
    console.log(err);
  }
};

export const deleteCurrencyFromFav = async (msg: TelegramBot.Message, currency: string) => {
  const { id } = msg.chat;
  try {
    await deleteFavCur(id, currency);
    bot.sendMessage(id, `${currency} was deleted from favourites`);
  } catch (err) {
    console.log(err);
  }
};

export const listFavourite = async (msg: TelegramBot.Message) => {
  const { id } = msg.chat;
  try {
    const favCurrencies = await getUserFavourites(id);
    if (!favCurrencies.length) {
      return bot.sendMessage(id, "your list is empty");
    }
    let message: string = "";
    const averageExchanges = await getAllCurrenciesAverageExchangeRates(9);
    averageExchanges.forEach((exchange) => {
      const { symbol } = exchange;
      if (favCurrencies.find((currency) => currency.symbol === symbol)) {
        const { symbol, "average price (USD)": price } = exchange;
        message += `\n/${symbol} ${price.toFixed()}$`;
      }
    });
    bot.sendMessage(id, message);
  } catch (err) {
    console.log(err);
  }
};

export const addCurrencyInFavourites = async (msg: TelegramBot.Message, currency: string) => {
  const { id } = msg.chat;
  try {
    const chat = await findChat(id);
    if (!chat) {
      await insertChat(id);
    }
    try {
      await insertFavCurrency(id, currency);
    } catch (err) {
      return addToFavErrorHandler(msg, err);
    }
    bot.sendMessage(id, `${currency} was added`);
  } catch (err) {
    console.log(err);
  }
};

export const showDetailedCurrencyInfo = async (msg: TelegramBot.Message, currency: string) => {
  let message: string = "";
  const { id } = msg.chat;
  const statisticsTime = [0.5, 1, 3, 6, 12, 24];
  try {
    for (let time of statisticsTime.values()) {
      let exchangeRate;
      try {
        exchangeRate = await getCurrencyAverageExchangeRate(time * 60, currency);
      } catch (err) {
        console.log(err);
        return bot.sendMessage(id, "no rates for this currency");
      }
      const { "average price (USD)": price } = exchangeRate[0];
      if (price === "no rates for this currency") {
        return bot.sendMessage(id, "no rates for this currency");
      } else {
        const price_ = Number(price);
        message += `${time}h:  ${price_.toFixed(3)}$\n`;
      }
    }
    bot.sendMessage(id, message, {
      reply_markup: messages.getModifyFavKeyboard(currency),
    });
  } catch (err) {
    console.log(err);
  }
};

export const listRecent = async (msg: TelegramBot.Message) => {
  const { id } = msg.chat;
  try {
    const exchanges = await getAllCurrenciesAverageExchangeRates(9);
    exchanges.sort((a, b) => b["average price (USD)"] - a["average price (USD)"]);
    let message = `Top 20 currencies: `;
    for (let i = 0; i < 20; i++) {
      const { symbol, "average price (USD)": price } = exchanges[i];
      message += `\n/${symbol} ${price.toFixed()}$`;
    }
    bot.sendMessage(id, message);
  } catch (err) {
    console.log(err);
  }
};

export const helloUser = (msg: TelegramBot.Message) => {
  const { id } = msg.chat;
  bot.sendMessage(id, messages.hello).catch((err) => console.log(err));
};

export const helpUser = (msg: TelegramBot.Message) => {
  let helpInfo = `<pre>List of all CryptoBot commands:`;
  const { id } = msg.chat;
  commands.forEach((command) => {
    const { command: name, description } = command;
    helpInfo += `\n${name + " ".repeat(35 - name.length)}${description}`;
  });
  helpInfo += "\n</pre>";
  bot.sendMessage(id, helpInfo, { parse_mode: "HTML" }).catch((err) => console.log(err));
};
