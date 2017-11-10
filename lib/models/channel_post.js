const mongoose = require('mongoose');
const conn = require('../db');

const ChannelPost = new mongoose.Schema({
  link: {
    type: String,
    index: true,
  },
  posted_on: {
    type: Date,
    default: Date.now,
  },
});

module.exports = conn.model('ChannelPost', ChannelPost);
