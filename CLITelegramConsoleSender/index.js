import "dotenv/config.js";
process.env["NTBA_FIX_350"] = 1;
import TelegramBot from "node-telegram-bot-bot";
import * as commander from "commander";
const { TOKEN, CHAT_ID } = process.env;

const bot = new TelegramBot(TOKEN, { polling: true });

const program = new commander.Command();
program.version("0.0.1");

program
  .command("message <text>")
  .description("send message to telegram bot")
  .alias("m")
  .action(async (text) => {
    await bot.sendMessage(CHAT_ID, text).catch((err) => console.log(err));
    process.exit();
  });

program
  .command("photo <photo>")
  .description("send photo to telegram bot")
  .alias("p")
  .action(async (photo) => {
    await bot.sendDocument(CHAT_ID, photo).catch((err) => console.log(err));
    process.exit();
  });

program.parse(process.argv);
