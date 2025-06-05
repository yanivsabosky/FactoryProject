const mongoose = require('mongoose');

 

const shiftSchema = new mongoose.Schema(
  {

   Date:Date, 
   Starting_Hour : Number , 
   Ending_Hour : Number
  },
  
);

const Shifts = mongoose.model('Shifts', shiftSchema, 'shifts');

module.exports = Shifts;