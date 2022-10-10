import axios from 'axios';
import TelegramBot from 'node-telegram-bot-api';
const TOKEN = '5784622230:AAGuSeRxIDcQhYuJOC0LEIGoUfYBlGLupNk'
const CHAT_ID = '462675613'
const URL = 'https://picsum.photos/200/300' 
const api = new TelegramBot(
    TOKEN,
    {polling: true},
)

console.log("Telegram bot ready to work")

api.on('message', (msg) => {
if (msg.text === 'photo'){
axios.get(URL)
.then(async function(response){
    await api.sendPhoto(CHAT_ID, response.request._redirectable._options.href)
    console.log(`${msg.from.first_name} got an image`)
})
.catch(function(error){
    console.log(error)
})
}
else{
const response = `${msg.from.first_name} send message \'${msg.text}\'`
console.log(response)
api.sendMessage(CHAT_ID, response)
}
})
