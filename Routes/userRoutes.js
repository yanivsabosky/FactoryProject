// Import dependencies
const express = require("express");
const router = express.Router();
const userController = require("../Controllers/userController");

// Import middleware
const { authenticateToken } = require("../middlewares/authMiddleware");
const { checkAndUpdateDailyAction } = require("../middlewares/dailyLimiter");
const { checkRole } = require("../middlewares/roleMiddleware");
const { LogAction } = require("../middlewares/actionLogger");

// Middleware to parse JSON requests
router.use(express.json());

// Middleware to log every user action
router.use(LogAction);

// Route: GET /users
// Description: Returns a list of all users (Admin only)
// Middleware:
//   - authenticateToken: Validates JWT token
//   - checkAndUpdateDailyAction: Validates user action quota
//   - checkRole(['Admin']): Ensures only Admins can access
router.get("/users", authenticateToken, checkAndUpdateDailyAction, checkRole(['Admin']), async (req, res) => {
  try {
    const data = await userController.getAllUsers();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message || "Server error" });
  }
});

// Exports 
module.exports = router;
