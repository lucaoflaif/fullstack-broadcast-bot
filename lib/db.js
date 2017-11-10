const mongoose = require('mongoose');

let conn;

try {
  conn = mongoose.createConnection(process.env.MONGO_DB);
} catch (err) {
  console.log('An error occured trying to connect the bot to your MongoDB istance.');
  console.log(err);
}

module.exports = conn;
