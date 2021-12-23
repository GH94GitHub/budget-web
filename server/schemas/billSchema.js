const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const billSchema = new Schema({
  name: { type: String, default: "No Name", required: true },
  dueDate: { type: Date, default: "2/22/2002", required: true },
  amount: { type: Number, default: 0, required: true}
});

module.exports = billSchema;
