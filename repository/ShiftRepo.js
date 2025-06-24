const shifts = require("../models/Shift");
const employee_shifts = require("../models/EmployeeShift")


// Repository methods for interacting with the Shifts and EmployeeShift collections

// Get all shifts from the database
const getAll = async()=>{
  return await  shifts.find();
}
//Get a specific shift by its ID
const getByid = async(id)=>{
  return await shifts.findById(id);

}

// Creating New Shift
const add = async(shift)=>{
    return await  shifts.create(shift)
}

//  Update a specific shift by its ID
const updateShifts = async(id,shift) =>{
    return await shifts.findByIdAndUpdate(id, shift, { new: true });

}

//  Assign an employee to a shift 
const addEmployeeToShift = async(shiftId, employeeId) => {
    return await employee_shifts.create({
        employeeId: employeeId,
        shiftId: shiftId
    });
}


// Export
module.exports = {
  getAll,
  updateShifts
  ,add,
  addEmployeeToShift,
  getByid,
 
}