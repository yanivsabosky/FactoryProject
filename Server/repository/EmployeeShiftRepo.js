const employee_shifts = require("../models/EmployeeShift");

//functions 

const getByEmployeeId = async(employeeId) => {
  return await employee_shifts.find({ employeeId });
};

const getByShiftId = async(shiftId) => {
    return await employee_shifts.find({ shiftId });
}

const add = async(employee)=> {
  return await employee_shifts.create(employee);
}

const deleteByEmployeeId = async(employeeId) => {
    return await employee_shifts.deleteMany({ employeeId });
}

const deleteByShiftId = async(shiftId) => {
    return await employee_shifts.deleteMany({ shiftId });
}


module.exports = {
  getByEmployeeId,
  add,
  getByShiftId,
  deleteByEmployeeId,
  deleteByShiftId

}