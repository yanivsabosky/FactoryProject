const mongoose = require('mongoose');

 

const userSchema = new mongoose.Schema(
  {
   Full_Name : String , 
   Num_Of_Actions: Number,
  
  },

);

const Users = mongoose.model('users', userSchema, 'Users');

module.exports = Users;