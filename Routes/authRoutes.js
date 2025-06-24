const express = require("express");
const router = express.Router();
const authController = require("../Controllers/authController");



// Route: Log in a user
// Expects: username and email in the request body
// If valid, returns a JWT token and user data
router.post("/login", async (req, res) => {
  try {
    const { username, email } = req.body;

    const result = await authController.login(username, email);

    if (result.success) {
      res.status(200).json({ token: result.token, user: result.user });
    } else {
      res.status(403).json({ message: result.message });
    }
  } catch (error) {
    res.status(500).json({ message: error.message || "Login failed" });
  }
});


// Route: Log out a user (client-side should handle token removal)
// Note: In stateless JWT systems, logout is typically handled on the client
router.post("/logout",  (req, res) => {
  try {
    const result =  authController.logout()
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message || "Logout failed" });
  }
});

// Exports
module.exports = router;