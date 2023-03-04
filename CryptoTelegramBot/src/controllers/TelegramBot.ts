import { bot } from "../index.js";
import TelegramBot from "node-telegram-bot-api";
import { commands } from "../Commands.js";
import {
  GetAllCurrenciesAverageExchangeRates,
  GetCurrencyAverageExchangeRate,
} from "../models/exchangeRate.js";
import { FindChat, InsertChat } from "../models/chat.js";
import {
  InsertFavCurrency,
  GetUserFavourites,
  DeleteFavCur,
} from "../models/FavouriteCurrency.js";
function AddToFavErrorHandler(msg: TelegramBot.Message, err: any) {
  try {
    if (err.errno != 19) return console.log(err);
    if (err.message.includes("UNIQUE", 0))
      bot.sendMessage(msg.chat.id, "currency is already in favoutires");
    else if (err.message.includes("NOT NULL", 0))
      bot.sendMessage(msg.chat.id, "no such currency");
  } catch (err) {
    console.log(err);
  }
}

export async function DeleteCurrencyFromFav(
  msg: TelegramBot.Message,
  currency: string
) {
  try {
    await DeleteFavCur(msg.chat.id, currency);
    bot.sendMessage(msg.chat.id, `${currency} was deleted from favourites`);
  } catch (err) {
    console.log(err);
  }
}

export async function ListFavourite(msg: TelegramBot.Message) {
  try {
    const favCurrencies = await GetUserFavourites(msg.chat.id);
    if (favCurrencies!.length === 0)
      return bot.sendMessage(msg.chat.id, "your list is empty");
    let message: string = "";
    const averageExchanges = await GetAllCurrenciesAverageExchangeRates(9);
    averageExchanges.forEach((exchange) => {
      if (favCurrencies!.find((currency) => currency.symbol == exchange.symbol))
        message += `\n/${exchange.symbol} ${exchange[
          "average price (USD)"
        ].toFixed()}$`;
    });
    return bot.sendMessage(msg.chat.id, message);
  } catch (err) {
    console.log(err);
  }
}

export async function AddCurrencyInFavourites(
  msg: TelegramBot.Message,
  currency: string
) {
  try {
    if (!(await FindChat(msg.chat.id))) await InsertChat(msg.chat.id);
    InsertFavCurrency(msg.chat.id, currency)
      .then(() => {
        bot.sendMessage(msg.chat.id, `${currency} was added`);
      })
      .catch((err) => AddToFavErrorHandler(msg, err));
  } catch (err) {
    console.log(err);
  }
}

function GetModifyFavKeyboard(
  currency: string
): TelegramBot.InlineKeyboardMarkup {
  return {
    inline_keyboard: [
      [
        {
          text: "Add To favourites",
          callback_data: `Add${currency}`,
        },
      ],
      [
        {
          text: "Delete from favourites",
          callback_data: `Delete${currency}`,
        },
      ],
    ],
  };
}

export async function ShowDetailedCurrencyInfo(
  msg: TelegramBot.Message,
  currency: string
) {
  let message: string = "";
  const statisticsTime = [0.5, 1, 3, 6, 12, 24];
  let flag = true;
  for (let time of statisticsTime.values()) {
    await GetCurrencyAverageExchangeRate(time * 60, currency)
      .then((exchangeRate) => {
        if (
          exchangeRate[0]["average price (USD)"] ===
          "no rates for this currency"
        )
          flag = false;
        else {
          const price = Number(exchangeRate[0]["average price (USD)"]);
          message += `${time}h:  ${price.toFixed(3)}$\n`;
        }
      })
      .catch((err) => {
        console.log(err);
        flag = false;
      });
    if (!flag)
      return bot
        .sendMessage(msg.chat.id, "no rates for this currency")
        .catch((err) => console.log(err));
  }
  bot
    .sendMessage(msg.chat.id, message, {
      reply_markup: GetModifyFavKeyboard(currency),
    })
    .catch((err) => console.log(err));
}

export function ListRecent(msg: TelegramBot.Message) {
  GetAllCurrenciesAverageExchangeRates(9)
    .then((exchangeRates) => {
      exchangeRates.sort(
        (a, b) => b["average price (USD)"] - a["average price (USD)"]
      );
      let message = `Top 20 currencies: `;
      for (let i = 0; i < 20; i++)
        message += `\n/${exchangeRates[i].symbol} ${exchangeRates[i][
          "average price (USD)"
        ].toFixed()}$`;
      bot.sendMessage(msg.chat.id, message).catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
}

export function HelloUser(msg: TelegramBot.Message) {
  bot
    .sendMessage(
      msg.chat.id,
      "Hello! This bot will help you monitor the average price of cryptocurrencies in USD, based on the data of five markets: coinbase, coinmarketcap, coinpaprika, coinstats, kucoin. Try /help for more info."
    )
    .catch((err) => console.log(err));
}

export function HelpUser(msg: TelegramBot.Message) {
  let helpInfo = `<pre>List of all CryptoBot commands:`;
  commands.forEach((command) => {
    helpInfo += `\n${
      command.command + " ".repeat(35 - command.command.length)
    }${command.description}`;
  });
  helpInfo += "\n</pre>";
  bot
    .sendMessage(msg.chat.id, helpInfo, { parse_mode: "HTML" })
    .catch((err) => console.log(err));
}
