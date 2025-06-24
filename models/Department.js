const mongoose = require('mongoose');
//  Schema for the Departments collection
const departmentSchema = new mongoose.Schema(
  {
// Department name
   Name : String , 
  //  Reference to the manager of the department
   Manager : {
     type: mongoose.Schema.Types.ObjectId,
     ref : 'employees'
   }
  },
 
);
// Creating the model for the "departments"
const Departments = mongoose.model('Departments', departmentSchema, 'departments');
// Exporting
module.exports = Departments;