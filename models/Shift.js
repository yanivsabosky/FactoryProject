const mongoose = require('mongoose');

 
// Creating Schema For MongoDB Collection
const shiftSchema = new mongoose.Schema(
  {
  //  The date of the shift  
   Date:Date, 
  //  The Starting Hour - End Hour Of The Shift
   Starting_Hour : Number , 
   Ending_Hour : Number
  },
  
);

// Creating The Model
const Shifts = mongoose.model('Shifts', shiftSchema, 'shifts');

// Exporting
module.exports = Shifts;