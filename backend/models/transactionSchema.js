const mongoose = require("mongoose");
const transactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,
    enum: ["USD", "EUR", "GBP", "INR", "etc."],
  },
  type: {
    type: String,
    required: true,
    enum: ["income", "expense"],
  },
  category: {
    type: String,
    required: true,
    enum: [
      "food",
      "bills",
      "transportation",
      "entertainment",
      "savings",
      "others",
    ],
  },
  status: {
    type: String,
    required: true,
    enum: ["completed", "pending", "failed"],
    default: "pending",
  },
  description: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Transaction = mongoose.model("Transaction", transactionSchema);
module.exports = Transaction;
