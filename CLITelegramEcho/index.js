import "dotenv/config.js";
import axios from "axios";
import TelegramBot from "node-telegram-bot-api";
const TOKEN = process.env.TOKEN;
const CHAT_ID = process.env.CHAT_ID;
const randPictureEndpoint = process.env.RAND_PICTURE_ENDPOINT;
const api = new TelegramBot(TOKEN, { polling: true });

console.log("Telegram bot ready to work");

api.on("message", (msg) => {
  if (msg.text === "photo") {
    axios
      .get(randPictureEndpoint)
      .then(async function (picture) {
        const pictureLink = picture.request._redirectable._options.href;
        await api.sendPhoto(CHAT_ID, pictureLink);
        console.log(`${msg.from.first_name} got an image`);
      })
      .catch(function (error) {
        console.log(error);
      });
  } else {
    const response = `${msg.from.first_name} send message \'${msg.text}\'`;
    console.log(response);
    api.sendMessage(CHAT_ID, response);
  }
});
