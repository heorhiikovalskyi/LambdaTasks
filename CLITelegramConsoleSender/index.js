import "dotenv/config.js";
process.env["NTBA_FIX_350"] = 1;
import TelegramBot from "node-telegram-bot-api";
import * as commander from "commander";

const TOKEN = process.env.TOKEN;
const CHAT_ID = process.env.CHAT_ID;

const api = new TelegramBot(TOKEN, { polling: true });

const program = new commander.Command();
program.version("0.0.1");

program
  .command("message <text>")
  .description("send message to telegram bot")
  .alias("m")
  .action(async function (text) {
    await api.sendMessage(CHAT_ID, text).catch((err) => console.log(err));
    process.exit();
  });

program
  .command("photo <photo>")
  .description("send photo to telegram bot")
  .alias("p")
  .action(async function (photo) {
    await api.sendDocument(CHAT_ID, photo).catch((err) => console.log(err));
    process.exit();
  });

program.parse(process.argv);
