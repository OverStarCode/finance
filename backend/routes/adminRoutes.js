const express = require("express");
const AdminLog = require("../models/adminSchema");
const roleAuthorization = require("../middleware/roleMiddleware");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// Create an admin log
router.post("/" , authMiddleware, roleAuthorization(["admin"]), async (req, res) => {
  try {
    const adminLog = new AdminLog(req.body);
    await adminLog.save();
    res
      .status(201)
      .json({ message: "Admin log created successfully", adminLog });
  } catch (error) {
    res.status(500).json({ message: "Error creating admin log", error });
  }
});

// Get all admin logs
router.get("/", authMiddleware, roleAuthorization(["admin"]), async (req, res) => {
  try {
    const adminLogs = await AdminLog.find();
    res.status(200).json(adminLogs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching admin logs", error });
  }
});

// Get an admin log by ID
router.get("/:id" , authMiddleware , roleAuthorization(["admin"]), async (req, res) => {
  try {
    const adminLog = await AdminLog.findById(req.params.id);
    if (!adminLog)
      return res.status(404).json({ message: "Admin log not found" });

    res.status(200).json(adminLog);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving admin log", error });
  }
});

// Delete an admin log
router.delete("/:id", authMiddleware, roleAuthorization(["admin"]), async (req, res) => {
  try {
    const adminLog = await AdminLog.findByIdAndDelete(req.params.id);
    if (!adminLog)
      return res.status(404).json({ message: "Admin log not found" });

    res.status(200).json({ message: "Admin log deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting admin log", error });
  }
});

module.exports = router;
