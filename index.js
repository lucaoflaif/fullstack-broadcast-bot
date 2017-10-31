require('dotenv').config();
const Bot = require('./lib/bot');

const bot = new Bot(process.env, {
  polling: true,
});

bot.run();
