const mongoose = require('mongoose'); 

// Schema for the Employees collection in MongoDB
const employeesSchema = new mongoose.Schema(
  {
  //  First & Last Name
   First_Name : String , 
   Last_Name : String ,

  // The Year The Employee Started To Work
   Start_Work_Year: Number,

  // Reference to the department this employee belongs to
   DepartmentID : {
       type: mongoose.Schema.Types.ObjectId,
        ref : 'Departments'
   }
  
  },
 
);
// Creating The Model
const Employees = mongoose.model('employees', employeesSchema, 'Employees');
// Exporting The Model
module.exports = Employees;