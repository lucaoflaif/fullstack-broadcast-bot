const expect = require('chai').expect;

const WelcomeMessage = require('./welcome_message');

const options = {
  WELCOME_MESSAGE: "Welcome *%s*!\nIf you didn't do it yet, subscribe yourself to @fullstackbroadcast."
}

const updates = [
  {
    new_chat_member: {
      first_name: 'Jak',
    }
  },
  {
  new_chat_member: {
    first_name: 'Jak',
    last_name: 'Corvasce'
    },
  }
];

describe('Repost', () => {
  it('should return the correctly parsed welcome text (first name only)', () => {
    const welcomeMessage = new WelcomeMessage(options, undefined, updates[0]);
    expect(welcomeMessage.parseMessage()).to.equal("Welcome *Jak*!\nIf you didn't do it yet, subscribe yourself to @fullstackbroadcast.");
  }),

  it('should return the correctly parsed welcome text (first and last name)', () => {
    const welcomeMessage = new WelcomeMessage(options, undefined, updates[1]);
    expect(welcomeMessage.parseMessage()).to.equal("Welcome *Jak Corvasce*!\nIf you didn't do it yet, subscribe yourself to @fullstackbroadcast.");
  });
});
