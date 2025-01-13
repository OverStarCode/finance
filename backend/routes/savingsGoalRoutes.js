const express = require("express");
const SavingsGoal = require("../models/savingGoalSchema");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// Create a savings goal
router.post("/", authMiddleware,async (req, res) => {
  try {
    const savingsGoal = new SavingsGoal(req.body);
    await savingsGoal.save();
    res
      .status(201)
      .json({ message: "Savings goal created successfully", savingsGoal });
  } catch (error) {
    res.status(500).json({ message: "Error creating savings goal", error });
  }
});

// Get all savings goals for a user
router.get("/:userId", authMiddleware, async (req, res) => {
  try {
    const savingsGoals = await SavingsGoal.find({ userId: req.params.userId });
    res.status(200).json(savingsGoals);
  } catch (error) {
    res.status(500).json({ message: "Error fetching savings goals", error });
  }
});

// Update a savings goal
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const savingsGoal = await SavingsGoal.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!savingsGoal)
      return res.status(404).json({ message: "Savings goal not found" });

    res.status(200).json({ message: "Savings goal updated", savingsGoal });
  } catch (error) {
    res.status(500).json({ message: "Error updating savings goal", error });
  }
});

// Delete a savings goal
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const savingsGoal = await SavingsGoal.findByIdAndDelete(req.params.id);
    if (!savingsGoal)
      return res.status(404).json({ message: "Savings goal not found" });

    res.status(200).json({ message: "Savings goal deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting savings goal", error });
  }
});

module.exports = router;
