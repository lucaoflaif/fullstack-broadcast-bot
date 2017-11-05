const expect = require('chai').expect;

const util = require('util');

const WelcomeMessage = require('./welcome_message');

const options = {
  WELCOME_MESSAGE: "Welcome *%s*!\nIf you didn't do it yet, subscribe yourself to @fullstackbroadcast.",
};

const updates = [
  {
    new_chat_member: {
      first_name: 'John',
    },
  },
  {
    new_chat_member: {
      first_name: 'John',
      last_name: 'Doe',
    },
  },
];

describe('Repost', () => {
  it('should return the correctly parsed welcome text (first name only)', () => {
    const welcomeMessage = new WelcomeMessage(options, undefined, updates[0]);
    const member = updates[0].new_chat_member;
    const fullName = member.first_name;

    expect(welcomeMessage.parseMessage()).to.equal(util.format(options.WELCOME_MESSAGE, fullName));
  });

  it('should return the correctly parsed welcome text (first and last name)', () => {
    const welcomeMessage = new WelcomeMessage(options, undefined, updates[1]);
    const member = updates[1].new_chat_member;
    const fullName = `${member.first_name} ${member.last_name}`;

    expect(welcomeMessage.parseMessage()).to.equal(util.format(options.WELCOME_MESSAGE, fullName));
  });
});
