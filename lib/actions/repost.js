module.exports = {
  action: 'message',
  callback: (options, bot, msg) => {
    const chatId = msg.chat.id;
    const groupId = options.GROUP_ID;

    if (this._isTargetChannel(options, chatId)) {
      this._repostToGroup(groupId, msg);
    }
  },
  _isTargetChannel(options, chatId) {
    return options.CHANNEL_ID === chatId;
  },
  _repostToGroup(groupId, bot, msg) {
    bot.sendMessage(groupId, msg.body);
  },
};
