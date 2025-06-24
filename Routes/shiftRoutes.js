// Import dependencies
const express = require("express");
const shiftController = require("../Controllers/shiftController");
// Import middleware
const { authenticateToken } = require("../middlewares/authMiddleware");
const { checkRole } = require("../middlewares/roleMiddleware");
const { LogAction } = require("../middlewares/actionLogger");



const router = express.Router();

// Middleware to parse JSON requests
router.use(express.json());

// Middleware to verify authentication
router.use(authenticateToken);


// Middleware to log all actions
router.use(LogAction)



// Route: POST /
// Description: Create a new shift (Admin only)
router.post("/",checkRole(['Admin']), async (req, res) => {
  try {
    const result = await shiftController.createShift(req.body);
    res.status(200).json({ message: "shift created successfully", result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route: PUT /edit/:id
// Description: Update a shift by ID (Admin only)
router.put("/edit/:id",checkRole(['Admin']), async (req, res) => {
  try {
    const result = await shiftController.updateShift(req.params.id,req.body)
    res.status(200).json({ message: "shift updated successfully", result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route: POST /assign-employee
// Description: Assign an employee to a shift (Admin only)
router.post("/assign-employee",checkRole(['Admin']), async (req, res) => {
  try {
    const { shiftId, employeeId } = req.body;
    const result = await shiftController.assignEmployeeToShift(shiftId, employeeId);
    res.status(200).json({ message: "employee assgined successfully", result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Exports
module.exports = router;
