const express = require("express");
const departmentController = require("../Controllers/departmentController");
const { checkAndUpdateDailyAction } = require("../middlewares/dailyLimiter");
const { checkRole } = require("../middlewares/roleMiddleware");
const { authenticateToken } = require("../middlewares/authMiddleware");
const { LogAction } = require("../middlewares/actionLogger");


const router = express.Router();

// Middlewares applied to all routes
router.use(express.json());
router.use(authenticateToken);
router.use(LogAction)


// Route: Get all departments
router.get("/", checkAndUpdateDailyAction, checkRole(['Admin', 'User']), async (req, res) => {
  try {
    const data = await departmentController.getAllDepartments();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route: Get department by ID (for editing)
router.get("/edit/:id", checkAndUpdateDailyAction, checkRole(['Admin', 'User']), async (req, res) => {
  try {
    const data = await departmentController.getDepartmentById(req.params.id);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//  Route: Create a new department
router.post("/new", checkAndUpdateDailyAction, checkRole(['Admin']), async (req, res) => {
  try {
    const result = await departmentController.createDepartment(req.body);
    res.status(201).json({ message: "Department created successfully", result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route: Assign a manager to a department
router.put("/edit/:id/assign-manager", checkAndUpdateDailyAction, checkRole(['Admin']), async (req, res) => {
  try {
    const { managerId } = req.body;
    const result = await departmentController.assignManager(req.params.id, managerId);
    res.status(200).json({ message: "Manager assigned successfully", result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



// Route: Update department data
router.put("/edit/:id", checkAndUpdateDailyAction, checkRole(['Admin']), async (req, res) => {
  try {
    const result = await departmentController.updateDepartment(req.params.id, req.body);
    res.status(200).json({ message: "Department updated successfully", result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route: Delete department (along with related employees)
router.delete("/edit/:id", checkAndUpdateDailyAction, checkRole(['Admin']), async (req, res) => {
  try {
    const result = await departmentController.deleteDepartment(req.params.id);
    res.status(200).json({ message: "Department deleted successfully", result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route: Get all employees that are not part of this department
router.get("/edit/:id/available-employees", checkAndUpdateDailyAction, checkRole(['Admin', 'User']), async (req, res) => {
  try {
    const result = await departmentController.getEmployeesNotInDepartment(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route: Assign an employee to a department
router.put("/edit/:id/assign-employee", checkAndUpdateDailyAction, checkRole(['Admin']), async (req, res) => {
  try {
    const { employeeId } = req.body;
    const result = await departmentController.assignEmployeeToDepartment(req.params.id, employeeId);
    res.status(200).json({ message: "Employee assigned successfully", result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Exports
module.exports = router;
