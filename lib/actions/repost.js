class Repost {
  static trigger() {
    return 'channel_post';
  }

  static init(options, bot, msg) {
    const obj = new Repost(options, bot, msg);
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

    console.log(chatId);
    if (this.isTargetChannel(chatId)) {
      this.repostToGroup(groupId);
    }
  }

  isTargetChannel(chatId) {
    return this.options.CHANNEL_ID == chatId;
  }

  repostToGroup(groupId) {
    this.bot.sendMessage(groupId, this.msg.text, { parse_mode: 'Markdown' });
  }
}

module.exports = Repost;
