# fullstack-broadcast-bot
A Telegram companion bot for https://t.me/fullstackbroadcast

## Features

- Forwards every channel post to a group.
- Receive messages from users and send 'em to a group.
- Delete duplicated links posted on the channel.

## Installation

Clone this repository:

```shell
git clone https://github.com/domcorvasce/fullstack-broadcast-bot
```

Then install project dependencies using your favourite **Node package manager**:

```shell
cd fullstack-broadcast-bot
npm i
```

## Configuration

The bot _requires_ a set of environment variable to configure itself.

Copy `.env.example` to `.env` and fill it with the necessary information.

The _WELCOME_MESSAGE_ environment variable must contain the `%s` placeholder that'll be replaced with the new user's name. Otherwise, the name will be appended at the end of the message.

## Getting Started

Once you've filled the `.env` file, you're ready to start the bot.

By default, the bot will use `long polling` instead of `webhooks`
so you don't need any other configuration:

```shell
node index.js
```

## Authors

- [@domcorvasce](https://github.com/domcorvasce)
- [@lucaoflaif](https://github.com/lucaoflaif)

## License

This repository is licensed under [GNU/GPL v3](LICENSE).
