const mongoose = require('mongoose');

 
//  Schema for linking employees to shifts (many-to-many relationship)
const employee_shiftSchema = new mongoose.Schema(
  {
    //  Reference to the employee assigned to the shift
    employeeId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'employees'
        },
    //  Reference to the shift the employee is assigned to
    shiftId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Shifts' 
      },
  }

);
// Creating The Model
const Employee_shifts = mongoose.model('employee_shifts', employee_shiftSchema, 'employee_shifts');

// Exporting The Model
module.exports = Employee_shifts;