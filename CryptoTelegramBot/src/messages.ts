import TelegramBot from "node-telegram-bot-api";
const getModifyFavKeyboard = (currency: string): TelegramBot.InlineKeyboardMarkup => {
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
};
export const messages = {
  hello:
    "Hello! This bot will help you monitor the average price of cryptocurrencies in USD, based on the data of five markets: coinbase, coinmarketcap, coinpaprika, coinstats, kucoin. Try /help for more info.",
  getModifyFavKeyboard,
};
