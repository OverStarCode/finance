const mongoose = require("mongoose");
const budgetSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
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
  budgetAmount: {
    type: Number,
    required: true,
  },
  spentAmount: {
    type: Number,
    default: 0,
  },
  month: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Budget = mongoose.model("Budget", budgetSchema);
module.exports = Budget;
