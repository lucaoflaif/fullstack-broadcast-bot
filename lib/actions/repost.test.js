const expect = require('chai').expect;

const repost = require('./repost');

const options = { CHANNEL_ID: '007' };

describe('Repost', () => {
  it('should returns true because the chat id refers to the right channel', () => {
    expect(repost._isTargetChannel(options, '007')).to.equal(true);
  });
});
