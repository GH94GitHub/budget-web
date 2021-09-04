const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  amount: { type: Number }
});

module.exports = mongoose.model('User', userSchema);
