// Import the shift service containing the business logic
const shiftService = require("../services/ShiftService");

// Controller to handle creating a new shift
const createShift = async (body) => {
  try {
    // Call service method to add a new shift with the provided data
    const data = await shiftService.addShift(body);
    return data;

  } catch (error) {
    // Propagate the error to be handled by the route
    throw error;
  }
};
// Controller to handle updating an existing shift by ID
const updateShift = async (id, body) => {
  try {
     // Call service method to update the shift with given ID and new data
    const data = await shiftService.updateShift(id, body);
    return data;

  } catch (error) {
    throw error;
  }
};

// Controller to assign an employee to a specific shift
const assignEmployeeToShift = async (shiftId, employeeId) => {
  try {
       // Call service method to add the employee to the shift
    const data = await shiftService.addEmployeeToShift(shiftId, employeeId);
    return data;

  } catch (error) {
    throw error;
  }
};

// Exports
module.exports = {
  createShift,
  updateShift,
  assignEmployeeToShift
};
