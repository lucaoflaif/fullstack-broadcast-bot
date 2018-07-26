const util = require('util');

class WelcomeMessage {
  static trigger() {
    return 'new_chat_members';
  }

  static init(options, bot, msg) {
    const obj = new WelcomeMessage(options, bot, msg);
    obj.callback();
  }

  constructor(options, bot, msg) {
    this.options = options;
    this.bot = bot;
    this.msg = msg;
  }

  callback() {
    const groupId = this.options.GROUP_ID;

    const welcomeMessage = this.parseMessage();
    this.sendMessage(groupId, welcomeMessage + ' ' + this.randomPhrase());
  }

  randomPhrase() {
    const PHRASES = JSON.parse(this.env.options.RANDOM_PHRASES);
    const RANDOM_INDEX = Math.floor(Math.random() * PHRASES.length);

    return PHRASES[RANDOM_INDEX];
  }

  parseMessage() {
    const firstName = this.msg.new_chat_member.first_name || null;
    const lastName = this.msg.new_chat_member.last_name || null;

    const fullName = ((lastName) ? firstName.concat(' ' + lastName) : firstName);
    return util.format(this.options.WELCOME_MESSAGE, fullName);
  }

  sendMessage(groupId, welcomeMessage) {
    this.bot.sendMessage(groupId, welcomeMessage, { parse_mode: 'Markdown' });
  }
}

module.exports = WelcomeMessage;
