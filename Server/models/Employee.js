const mongoose = require('mongoose'); 

const employeesSchema = new mongoose.Schema(
  {
  
   First_Name : String , 
   Last_Name : String ,
   Start_Work_Year: Number,
   DepartmentID : {
       type: mongoose.Schema.Types.ObjectId,
        ref : 'Departments'
   }
  
  },
 
);

const Employees = mongoose.model('employees', employeesSchema, 'Employees');

module.exports = Employees;