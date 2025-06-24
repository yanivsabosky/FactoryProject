// Import the department service that contains the business logic
const department_service = require("../services/DepartmentService");

// Get a list of all departments
const getAllDepartments = async () => {
  try {
    return await department_service.getAll();
  } catch (error) {
    throw error;
  }
};

// Get details of a specific department by its ID
const getDepartmentById = async (id) => {
  try {
    return await department_service.getDepartmentById(id);
  } catch (error) {
    throw error;
  }
};

// Create a new department with the given request body
const createDepartment = async (body) => {
  try {
    return await department_service.addDepartment(body);
  } catch (error) {
    throw error;
  }
};

// Update a department by its ID
const updateDepartment = async (id, body) => {
  try {
    return await department_service.updateDepartment(id, body);
  } catch (error) {
    throw error;
  }
};

// Delete a department by its ID
const deleteDepartment = async (id) => {
  try {
    return await department_service.deleteDepartment(id);
  } catch (error) {
    throw error;
  }
};

// Assign an employee to a specific department
const assignEmployeeToDepartment = async (departmentId, employeeId) => {
  try {
    return await department_service.assignEmployeeToDepartment(departmentId, employeeId);
  } catch (error) {
    throw error;
  }
};

// Get all employees who are not assigned to the specified department
const getEmployeesNotInDepartment = async (departmentId) => {
  try {
    return await department_service.getEmployeesNotInDepartment(departmentId);
  } catch (error) {
    throw error;
  }
};

// Assign a manager to the department
const assignManager = async (departmentId, managerId) => {
  return await department_service.assignManager(departmentId, managerId);
};

// Exports
module.exports = {
  getAllDepartments,
  getDepartmentById,
  createDepartment,
  updateDepartment,
  deleteDepartment,
  assignEmployeeToDepartment,
  getEmployeesNotInDepartment,
  assignManager
};
