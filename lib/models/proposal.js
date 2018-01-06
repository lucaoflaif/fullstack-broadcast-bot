const mongoose = require('mongoose');
const conn = require('../db');

const Proposal = new mongoose.Schema({
  userId: {
    type: String,
  },
  postedOn: {
    type: Date,
    default: Date.now,
  },
  content: {
    type: String,
  },
  firstName: {
    type: String,
  },
  username: {
    type: String,
  },
});

module.exports = conn.model('Proposal', Proposal);
