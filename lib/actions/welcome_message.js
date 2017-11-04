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
    const chatId = this.msg.chat.id;
    const groupId = this.options.GROUP_ID;

    const welcome_message = this.parseMessage();
    this.sendMessage(groupId, welcome_message);
  }

  parseMessage() {
    const first_name = this.msg.new_chat_member.first_name || null;
    const last_name = this.msg.new_chat_member.last_name || null;

    const full_name = ((last_name) ? first_name.concat(" " + last_name) : first_name);
    return util.format(this.options.WELCOME_MESSAGE, full_name);
  }

  sendMessage(groupId, welcome_message) {
    this.bot.sendMessage(groupId, welcome_message, { parse_mode: 'Markdown' });
  }
}

module.exports = WelcomeMessage;
