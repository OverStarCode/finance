const express = require("express");

const authenticateToken = require("../middleware/authMiddleware");
const { login, register ,logout, getUser } = require("../controllers/userController");
const router = express.Router();

// Public: Register user
router.post("/register", register
);

// Public: Login user
router.post("/login",login);

// log out 
router.post("/logout", logout);

// Protected: Get user profile
router.get("/:id", authenticateToken, getUser);


module.exports = router;
