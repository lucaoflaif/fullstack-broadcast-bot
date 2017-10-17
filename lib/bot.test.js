const expect = require('chai').expect;

const Bot = require('./bot');

describe('Bot', () => {
  it('should require a token', () => {
    expect(() => new Bot({})).to.throw('Missing Telegram bot token');
    expect(() => new Bot({ BOT_TOKEN: '' })).not.to.throw('Missing Telegram bot token');
  });
});
