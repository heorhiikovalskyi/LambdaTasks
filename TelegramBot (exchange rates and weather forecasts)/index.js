import "dotenv/config.js";
import axios from "axios";
import TelegramBot from "node-telegram-bot-api";
import {
  GetCoord,
  CreateForecastMessage,
  CreateExchangesMessage,
} from "./helpFunctions.js";

const API_KEY = process.env.WEATHER_API_KEY;
const TOKEN = process.env.TELEGRAM_TOKEN;
const monoEndPoint = process.env.MONOBANK_ENDPOINT;
const city = "Kyiv";
const StartMenu = {
  reply_markup: {
    keyboard: [["Прогноз у Києві"], ["Курс валют"]],
  },
};
let MonoData;
await UpdateMonoData();
setInterval(UpdateMonoData, 330000);
async function UpdateMonoData() {
  const UAH = 980;
  const $ = 840;
  const EURO = 978;
  await axios
    .get(monoEndPoint)
    .then((response) => {
      MonoData = response.data;
      MonoData = MonoData.filter(
        (value) =>
          value.currencyCodeB == UAH &&
          (value.currencyCodeA == $ || value.currencyCodeA == EURO)
      );
      if (MonoData[0].currencyCodeA == 840) {
        const temp = MonoData[1];
        MonoData[1] = MonoData[0];
        MonoData[0] = temp;
      }
    })
    .catch((err) => console.log(err));
}

const bot = new TelegramBot(TOKEN, { polling: true });

bot.onText(/Кожні (3|6) годин/i, async (msg) => {
  const hours = msg.text[6];
  let coord;
  try {
    coord = await GetCoord(city);
  } catch (err) {
    return console.log(err);
  }
  const weatherEndpoint =
    process.env.GET_WEATHER_ENDPOINT + `&lat=${coord.lat}&lon=${coord.lon}`;
  let weatherData;
  await axios
    .get(weatherEndpoint)
    .then((response) => {
      weatherData = response.data.list;
      let message;
      if (hours == "3") message = CreateForecastMessage(weatherData);
      else
        message = CreateForecastMessage(
          weatherData.filter((element, index) => index % 2 == 0)
        );
      bot.sendMessage(msg.chat.id, message);
    })
    .catch((err) => console.log(err));
});

bot.onText(/^Privat/i, (msg) => {
  const date = new Date();
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  const privatEndpoint =
    process.env.PRIVAT_ENDPOINT + `${day}.${month}.${year}`;
  axios
    .get(privatEndpoint)
    .then((response) => {
      let exchanges = response.data.exchangeRate;
      exchanges = exchanges.filter(
        (value) => value.currency == "USD" || value.currency == "EUR"
      );
      const necessaryExchanges = [];
      exchanges.forEach((exchange) =>
        necessaryExchanges.push({
          rateBuy: exchange.purchaseRate.toFixed(3),
          rateSell: exchange.saleRate.toFixed(3),
        })
      );
      bot.sendMessage(msg.chat.id, CreateExchangesMessage(necessaryExchanges));
    })
    .catch((err) => console.log(err));
});

bot.onText(/^Mono/i, async (msg) => {
  const exchanges = [];
  MonoData.forEach((exchange) =>
    exchanges.push({
      rateBuy: exchange.rateBuy.toFixed(3),
      rateSell: exchange.rateSell.toFixed(3),
    })
  );

  bot
    .sendMessage(msg.chat.id, CreateExchangesMessage(exchanges))
    .catch((err) => console.log(err));
});

bot.onText(/^Курс/i, (msg) => {
  bot
    .sendMessage(msg.chat.id, "Оберіть банк", {
      reply_markup: {
        keyboard: [["Mono", "Privat"], ["Повернутись"]],
      },
    })
    .catch((err) => console.log(err));
});
bot.on("polling_error", console.log);
bot.onText(/^Прогноз/i, (msg) => {
  bot
    .sendMessage(msg.chat.id, "Оберіть проміжок", {
      reply_markup: {
        keyboard: [["Кожні 3 години", "Кожні 6 годин"], ["Повернутись"]],
      },
    })
    .catch((err) => console.log(err));
});

bot.onText(/\/start/, (msg) => {
  bot
    .sendMessage(msg.chat.id, "Головне меню", StartMenu)
    .catch((err) => console.log(err));
});

bot.onText(/^Повернутись/i, (msg) => {
  bot
    .sendMessage(msg.chat.id, "Головне меню", StartMenu)
    .catch((err) => console.log(err));
});
