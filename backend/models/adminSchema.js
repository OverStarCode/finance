const mongoose = require("mongoose");
const adminLogSchema = new mongoose.Schema({
  action: {
    type: String,
    required: true,
    trim: true,
  },
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Assuming admins are users with a specific role
  },
  details: {
    type: String,
    trim: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const AdminLog = mongoose.model("AdminLog", adminLogSchema);
module.exports = AdminLog;
