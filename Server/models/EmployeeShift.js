const mongoose = require('mongoose');

 

const employee_shiftSchema = new mongoose.Schema(
  {
    employeeId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'employees'
        },
    shiftId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Shifts' 
      },
  }

);

const Employee_shifts = mongoose.model('employee_shifts', employee_shiftSchema, 'employee_shifts');

module.exports = Employee_shifts;