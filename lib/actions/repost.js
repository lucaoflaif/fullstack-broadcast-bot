const ChannelPost = require('../models/channel_post');

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
    this.link = this.msg.text.match(/(\#.*\s)+(.*)/)[2];
  }

  callback() {
    const chatId = this.msg.chat.id;

    if (!this.isTargetChannel(chatId)) return;

    ChannelPost.findOne({ link: this.link }, (err, resp) => {
      if (err) {
        this.bot.sendMessage(this.options.ADMIN_GROUP_ID, err.toString());
      }

      if (resp !== null) {
        this.bot.deleteMessage(chatId, this.msg.message_id);
        return;
      }

      this.storeLink();
      this.bot.sendMessage(this.options.GROUP_ID, this.msg.text, { parse_mode: 'Markdown' });
    });
  }

  isTargetChannel(chatId) {
    return this.options.CHANNEL_ID == chatId;
  }

  storeLink() {
    ChannelPost.findOne({ link: this.link }, (err, resp) => {
      post.save((err) => {
        if (err) {
          this.bot.sendMessage(this.options.ADMIN_GROUP_ID, err);
        }
      });
    });
  }
}

module.exports = Repost;
