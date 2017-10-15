const expect = require('chai').expect;

const Bot = require('./bot');

describe('Bot', () => {
  it('should require a token', () => {
    expect(() => new Bot({})).to.throw('Missing Telegram bot token');
  });
});
