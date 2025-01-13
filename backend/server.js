const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const dbConnection = require("./config/db_config")

// Load environment variables
dotenv.config();

// Initialize app
const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB

dbConnection();

// Route imports
const userRoutes = require("./routes/userRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const budgetRoutes = require("./routes/budgetRoutes");
const savingsGoalRoutes = require("./routes/savingsGoalRoutes");
const dbConnetion = require("./config/db_config");

// Routes middleware
app.use("/api/users", userRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/budgets", budgetRoutes);
app.use("/api/savings-goals", savingsGoalRoutes);
app.use("/api/notifications", require("./routes/notificationRoutes"));
app.use("api/admin", require("./routes/adminRoutes"));

// add all routes middlewares 


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
