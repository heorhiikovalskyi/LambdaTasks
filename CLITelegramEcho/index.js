import "dotenv/config.js";
import axios from "axios";
import TelegramBot from "node-telegram-bot-api";
const { TOKEN, CHAT_ID } = process.env;
const picsumEndpoint = process.env.RAND_PICTURE_ENDPOINT;
const bot = new TelegramBot(TOKEN, { polling: true });

console.log("Telegram bot ready to work");

bot.on("message", async (msg) => {
  const {
    from: { first_name: firstName },
    text,
  } = msg;
  try {
    if (text === "photo") {
      const rawResp = await axios.get(picsumEndpoint);
      const {
        _options: { href: picLink },
      } = rawResp.request._redirectable;
      await bot.sendPhoto(CHAT_ID, picLink);
      console.log(`${firstName} got an image`);
    } else {
      const response = `${firstName} send message '${text}'`;
      console.log(response);
      bot.sendMessage(CHAT_ID, response);
    }
  } catch (err) {
    console.log(err);
  }
});
