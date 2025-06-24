// Import dependencies
const express = require("express");
const employeeController = require("../Controllers/employeeController");
const { authenticateToken } = require("../middlewares/authMiddleware");
const { checkAndUpdateDailyAction } = require("../middlewares/dailyLimiter");
const { checkRole } = require("../middlewares/roleMiddleware");
const { LogAction } = require("../middlewares/actionLogger");



const router = express.Router();

// Middleware
router.use(express.json());
router.use(authenticateToken);
router.use(LogAction)

// Route: GET /employees
// Description: Fetch all employees (Admin & User)
router.get("/", checkAndUpdateDailyAction, checkRole(['Admin', 'User']), async (req, res) => {
  try {
    const data = await employeeController.getAllEmployees();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route: GET /employees/department/:departmentId
// Description: Fetch employees by department (Admin & User)
router.get("/department/:departmentId", checkAndUpdateDailyAction, checkRole(['Admin', 'User']), async (req, res) => {
  try {
    const data = await employeeController.getEmployeesByDepartment(req.params.departmentId);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route: GET /employees/edit/:id
// Description: Fetch employee by ID (for edit view)
router.get("/edit/:id", checkAndUpdateDailyAction, checkRole(['Admin', 'User']), async (req, res) => {
  try {
    const data = await employeeController.getEmployeeById(req.params.id);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Route: PUT /employees/edit/:id
// Description: Update employee data (Admin only)
router.put("/edit/:id", checkAndUpdateDailyAction, checkRole(['Admin']), async (req, res) => {
  try {
    const result = await employeeController.updateEmployee(req.params.id, req.body);
    res.status(200).json({ message: "Employee updated successfully", result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route: DELETE /employees/edit/:id
// Description: Delete an employee (Admin only)
router.delete("/edit/:id", checkAndUpdateDailyAction, checkRole(['Admin']), async (req, res) => {
  try {
    const result = await employeeController.deleteEmployee(req.params.id);
    res.status(200).json({ message: "Employee deleted successfully", result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route: POST /employees/edit/:id/assign-shift
// Description: Assign a shift to an employee (Admin only)
router.post("/edit/:id/assign-shift", checkAndUpdateDailyAction, checkRole(['Admin']), async (req, res) => {
  try {
    const { shiftId } = req.body;
    const result = await employeeController.assignShift(req.params.id, shiftId);
    res.status(200).json({ message: "Shift assigned to employee", result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route: POST /employees/new
// Description: Create a new employee (Admin only)
router.post("/new", checkAndUpdateDailyAction, checkRole(['Admin']), async (req, res) => {
  try {
    const result = await employeeController.createEmployee(req.body);
    res.status(201).json({ message: "Employee created successfully", result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Exports
module.exports = router;
