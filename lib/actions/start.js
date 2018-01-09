class Start {
  static trigger() {
    return /^\/start$/;
  }

  static init(options, bot, msg, match = null) {
    const obj = new Start(options, bot, msg, match);
    obj.callback();
  }

  constructor(options, bot, msg) {
    this.options = options;
    this.bot = bot;
    this.msg = msg;
    this.messageOptions = { parse_mode: 'Markdown' };
  }

  callback() {
    const userId = this.msg.from.id;
    const message = 'Type `/propose` followed by your message to send us proposals.';

    this.bot.sendMessage(userId, message, this.messageOptions);
  }
}

module.exports = Start;
