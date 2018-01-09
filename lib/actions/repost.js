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
  }

  callback() {
    const chatId = this.msg.chat.id;

    if (!this.isTargetChannel(chatId)) return;

    if (this.isDuplicatePost()) {
      this.bot.deleteMessage(this.msg.chat.id, this.msg.message_id);
      return;
    }

    this.bot.sendMessage(this.options.GROUP_ID, this.msg.text, { parse_mode: 'Markdown' });
  }

  isTargetChannel(chatId) {
    return this.options.CHANNEL_ID == chatId;
  }

  isDuplicatePost() {
    return ChannelPost.findOne({ link: link }, (err, resp) => {
      if (err) {
        this.bot.sendMessage(this.options.ADMIN_GROUP_ID, err.toString());
      }

      if (resp === null) {
        return false;
      }

      return true;
    });
  }

  createPost() {
    ChannelPost.findOne({ link: link }, (err, resp) => {
      post.save((err) => {
        if (err) {
          this.bot.sendMessage(this.options.ADMIN_GROUP_ID, err);
        }
      });
    });
  }
}

module.exports = Repost;
