const Proposal = require('../models/proposal');

class Contact {
  static trigger() {
    return /\/propose (.*)/;
  }

  static init(options, bot, msg, match = null) {
    const obj = new Contact(options, bot, msg, match);
    obj.callback();
  }

  constructor(options, bot, msg, match) {
    this.options = options;
    this.bot = bot;
    this.msg = msg;
    this.match = match;
    this.messageOptions = { parse_mode: 'Markdown' };
  }

  callback() {
    const userId = this.msg.from.id;
    const content = this.match[1];
    let message = '*Proposal sent with success! You shall receive a response soon.*';

    const proposal = new Proposal({
      userId,
      content,
      username: this.msg.from.username,
      firstName: this.msg.from.first_name,
    });

    // Save the proposal persistently so we can access it everytime.
    proposal.save((err) => {
      if (err) {
        this.bot.sendMessage(this.options.GROUP_ID, err);
        message = 'An unknown error occurred! Retry later.';
      }
    });

    this.bot.sendMessage(userId, message, this.messageOptions);
    this.sendProposalToAdminGroup(proposal);
  }

  sendProposalToAdminGroup(proposal) {
    const message = [
      '_You have just received a new proposal_',
      `*Username:* @${proposal.username}`,
      `*Content:* @${proposal.content}`,
    ];

    this.bot.sendMessage(this.options.ADMIN_GROUP_ID, message.join('\n'), this.messageOptions);
  }
}

module.exports = Contact;
