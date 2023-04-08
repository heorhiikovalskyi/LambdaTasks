import TelegramBot from "node-telegram-bot-api";
import "dotenv/config.js";
const { TELEGRAM_TOKEN } = process.env;
const bot = new TelegramBot(TELEGRAM_TOKEN);
import { startMenu, chooseForecastKeyboard, chooseBankKeyboard } from "../messages.js";
import { createExchangesMessage, createForecastMessage } from "../viewFunctions.js";
import { getPrivatExchanges } from "../apis/privatBank.js";
import { getWeather, getCoord } from "../apis/openWeather.js";
import { getMonoExchanges } from "../apis/monobank.js";
let monoExchanges;
const city = "Kyiv";
export const updateMonoExchanges = async () => {
  const UAH = 980;
  const $ = 840;
  const EURO = 978;
  try {
    monoExchanges = await getMonoExchanges();
  } catch (err) {
    console.log(err);
    return;
  }
  monoExchanges = monoExchanges.filter((exchange) => {
    const { currencyCodeA: currency1, currencyCodeB: currency2 } = exchange;
    return currency2 === UAH && (currency1 === $ || currency1 === EURO);
  });
  if (monoExchanges[0].currencyCodeA == 840) {
    [monoExchanges[1], monoExchanges[0]] = [monoExchanges[0], monoExchanges[1]];
  }
};

export const start = (msg) => {
  bot.sendMessage(msg.chat.id, "Головне меню", startMenu).catch((err) => console.log(err));
};

export const chooseForecast = (msg) => {
  bot.sendMessage(msg.chat.id, "Оберіть проміжок", chooseForecastKeyboard).catch((err) => console.log(err));
};

export const chooseBank = (msg) => {
  bot.sendMessage(msg.chat.id, "Оберіть банк", chooseBankKeyboard).catch((err) => console.log(err));
};

export const sendMonoExchanges = (msg) => {
  const response = createExchangesMessage(monoExchanges);
  bot.sendMessage(msg.chat.id, response).catch((err) => console.log(err));
};

export const sendPrivatExchanges = async (msg) => {
  const date = new Date();
  let exchanges;
  try {
    exchanges = await getPrivatExchanges(date);
  } catch (err) {
    console.log(err);
    return;
  }
  exchanges = exchanges.filter((exchange) => {
    const { currency } = exchange;
    return currency === "USD" || currency === "EUR";
  });
  const exchangesToView = [];
  exchanges.forEach((exchange) =>
    exchangesToView.push({
      rateBuy: exchange.purchaseRate,
      rateSell: exchange.saleRate,
    })
  );
  bot.sendMessage(msg.chat.id, createExchangesMessage(exchangesToView));
};

export const sendWeather = async (msg) => {
  const period = msg.text[6];
  try {
    const coord = await getCoord(city);
    let weather = await getWeather(coord);
    if (period === "6") {
      weather = weather.filter((element, index) => index % 2 === 0);
    }
    const message = createForecastMessage(weather);
    bot.sendMessage(msg.chat.id, message);
  } catch (err) {
    console.log(err);
    return;
  }
};
