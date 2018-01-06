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
    const groupId = this.options.GROUP_ID;

    if (this.isTargetChannel(chatId)) {
      const duplicated = this.preventDuplicatePost();

      if (!duplicated) {
        this.repostToGroup(groupId);
      }
    }
  }

  isTargetChannel(chatId) {
    return this.options.CHANNEL_ID == chatId;
  }

  preventDuplicatePost() {
    const link = this.msg.text.match(/(\#.*\s)+(.*)/)[2];
    const posts = ChannelPost.findOne({ link: link }, (err, resp) => {
      if (resp === null) {
        const post = new ChannelPost({ link });

        post.save((err) => {
          if (err) {
            this.bot.sendMessage(this.options.ADMIN_GROUP_ID, err);
          }
        });

        return false;
      }

      this.bot.deleteMessage(this.msg.chat.id, this.msg.message_id);
      return true;
    });
  }

  repostToGroup(groupId) {
    this.bot.sendMessage(groupId, this.msg.text, { parse_mode: 'Markdown' });
  }
}

module.exports = Repost;
