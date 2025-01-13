const express = require("express");
const Transaction = require("../models/transactionSchema");
const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

// Protected: Create a transaction
router.post("/", authenticateToken, async (req, res) => {
  try {
    const transaction = new Transaction({
      ...req.body,
      userId: req.user.userId,
    });
    await transaction.save();
    res
      .status(201)
      .json({ message: "Transaction created successfully", transaction });
  } catch (error) {
    res.status(500).json({ message: "Error creating transaction", error });
  }
});

// Protected: Get all transactions for a user
router.get("/", authenticateToken, async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user.userId });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching transactions", error });
  }
});

// Other endpoints follow the same pattern...
module.exports = router;
