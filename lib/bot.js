const TelegramBot = require('node-telegram-bot-api');

const actions = require('./actions');

class Bot {
  constructor(env, options) {
    if (env.BOT_TOKEN === undefined) {
      throw new Error('Missing Telegram bot token');
    }

    this.env = env;
    this.options = options;
    this.bot = null;
  }

  run() {
    this.bot = new TelegramBot(this.env.BOT_TOKEN, this.options);
    this.registerActions();
  }

  registerActions() {
    actions.forEach((action) => {
      if (action.trigger().toString().match(RegExp('/.*/'))) {
        this.bot.onText(action.trigger(), action.init.bind(this, this.env, this.bot));
        return;
      }

      this.bot.on(action.trigger(), action.init.bind(this, this.env, this.bot));
    });
  }
}

module.exports = Bot;
