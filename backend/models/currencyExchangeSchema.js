const mongoose = require("mongoose");
const exchangeRateSchema = new mongoose.Schema({
  baseCurrency: {
    type: String,
    required: true,
    enum: ["USD", "EUR", "GBP", "INR", "etc."],
  },
  targetCurrency: {
    type: String,
    required: true,
    enum: ["USD", "EUR", "GBP", "INR", "etc."],
  },
  exchangeRate: {
    type: Number,
    required: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const ExchangeRate = mongoose.model("ExchangeRate", exchangeRateSchema);
module.exports = ExchangeRate;
