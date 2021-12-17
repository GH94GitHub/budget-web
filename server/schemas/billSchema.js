const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const billSchema = new Schema({
  name: { type: String },
  dueDate: { type: Date },
  amount: { type: Number }
});

module.exports = billSchema;
