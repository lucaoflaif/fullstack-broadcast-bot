const expect = require('chai').expect;

const Repost = require('./repost');

const options = { CHANNEL_ID: '007' };

describe('Repost', () => {
  it('should returns true because the chat id refers to the right channel', () => {
    const repost = new Repost(options, undefined, undefined);
    expect(repost.isTargetChannel('007')).to.equal(true);
  });
});
