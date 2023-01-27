process.env["NTBA_FIX_350"] = 1;
import TelegramBot from 'node-telegram-bot-api';
import * as commander from 'commander';
const TOKEN = '5784622230:AAGuSeRxIDcQhYuJOC0LEIGoUfYBlGLupNk'
const CHAT_ID = '462675613'
const api = new TelegramBot(
    TOKEN,
    {polling: true}
)

const program = new commander.Command()

program.version('0.0.1')
program.command("message <text>")
.description('send message to telegram bot')
.alias('m')
.action(async function(text) {
await api.sendMessage(CHAT_ID, text)
process.exit()
})

program.command("photo <photo>")
.description('send photo to telegram bot')
.alias('p')
.action(async function(photo) {
await api.sendDocument(CHAT_ID,  photo)
process.exit()
})

program.parse(process.argv)
