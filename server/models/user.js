const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const billSchema = require("../schemas/billSchema");

const userSchema = new Schema(
  {
    firstName: { type: String},
    lastName: { type: String },
    userName: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    bills: [billSchema],
    budget: {
      amount: { type: Number },
      startDate: { type: Date },
      endDate: { type: Date },
      transactions: [ billSchema ],
      billsDue: [ billSchema ]
    },
    dateCreated: { type: Date, default: new Date() }
  },
  { collection: "users" }
);

module.exports = mongoose.model('User', userSchema);
