const express = require("express");
const Budget = require("../models/budgetSchema");

const router = express.Router();

// Create a budget
router.post("/", async (req, res) => {
  try {
    const budget = new Budget(req.body);
    await budget.save();
    res.status(201).json({ message: "Budget created successfully", budget });
  } catch (error) {
    res.status(500).json({ message: "Error creating budget", error });
  }
});

// Get budgets for a user
router.get("/:userId", async (req, res) => {
  try {
    const budgets = await Budget.find({ userId: req.params.userId });
    res.status(200).json(budgets);
  } catch (error) {
    res.status(500).json({ message: "Error fetching budgets", error });
  }
});

// Update a budget
router.put("/:id", async (req, res) => {
  try {
    const budget = await Budget.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!budget) return res.status(404).json({ message: "Budget not found" });

    res.status(200).json({ message: "Budget updated", budget });
  } catch (error) {
    res.status(500).json({ message: "Error updating budget", error });
  }
});

// Delete a budget
router.delete("/:id", async (req, res) => {
  try {
    const budget = await Budget.findByIdAndDelete(req.params.id);
    if (!budget) return res.status(404).json({ message: "Budget not found" });

    res.status(200).json({ message: "Budget deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting budget", error });
  }
});

module.exports = router;
