const shifts = require("../models/Shift");
const employee_shifts = require("../models/EmployeeShift")


// functions

const getAll = async()=>{
  return await  shifts.find();
}

const getByid = async(id)=>{
  return await shifts.findById(id);

}

const add = async(shift)=>{
    return await  shifts.create(shift)
}

const updateShifts = async(id,shift) =>{
    return await shifts.findByIdAndUpdate(id, shift, { new: true });

}

const addEmployeeToShift = async(shiftId, employeeId) => {
    return await employee_shifts.create({
        employeeId: employeeId,
        shiftId: shiftId
    });
}

const deleteShift = async(id) =>{
   return await shifts.findByIdAndDelete(id);
}

module.exports = {
  getAll,
  updateShifts
  ,add,
  addEmployeeToShift,
  getByid,
  deleteShift
}