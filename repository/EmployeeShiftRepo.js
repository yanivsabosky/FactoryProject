const employee_shifts = require("../models/EmployeeShift");

//Repository functions for the employee_shifts collection
// This collection links employees to their assigned shifts

//  Get all shift links for a specific employee
const getByEmployeeId = async(employeeId) => {
  return await employee_shifts.find({ employeeId });
};

// Get all employee links for a specific shift
const getByShiftId = async(shiftId) => {
    return await employee_shifts.find({ shiftId });
}

//  Create a new link between employee and shift
const add = async(employee)=> {
  return await employee_shifts.create(employee);
}

// Delete all shift links for a given employee
const deleteByEmployeeId = async(employeeId) => {
    return await employee_shifts.deleteMany({ employeeId });
}
// Delete all employee links for a given shift
const deleteByShiftId = async(shiftId) => {
    return await employee_shifts.deleteMany({ shiftId });
}

// Exports
module.exports = {
  getByEmployeeId,
  add,
  getByShiftId,
  deleteByEmployeeId,
  deleteByShiftId

}