const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema(
  {

   Name : String , 
   Manager : {
     type: mongoose.Schema.Types.ObjectId,
     ref : 'employees'
   }
  },
 
);

const Departments = mongoose.model('Departments', departmentSchema, 'departments');

module.exports = Departments;