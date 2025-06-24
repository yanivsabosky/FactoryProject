const express = require("express");

// Middleware to check if the user's role is allowed to access the route
const checkRole = (allowedRoles) => {
  return (req, res, next) => {
    try {
       // Extract the role from the authenticated user object
      const role = req.user.role;

      // If the user's role is not in the list of allowed roles, deny access
      if (!allowedRoles.includes(role)) {
        return res.status(403).json({ message: "Access Denied - You don’t have permission" });
      }
       // If the role is allowed, continue to the next middleware/controller
      next();
    } catch (error) {
      console.error("Role check error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
};

// Export
module.exports = { 
  checkRole 
};
