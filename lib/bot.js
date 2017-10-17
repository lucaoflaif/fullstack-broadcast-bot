class Bot {
  constructor(env) {
    if (env.BOT_TOKEN === undefined) {
      throw new Error('Missing Telegram bot token');
    }

    this.env = env;
  }
}

module.exports = Bot;
