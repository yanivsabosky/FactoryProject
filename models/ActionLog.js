const mongoose = require('mongoose');

// Creating The Collection For MongoDB
const actionlog_Schema = new mongoose.Schema(
  {
    // Reference to the user who performed the action
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users' 
    } ,
    //  HTTP method or type of action performed (e.g. "GET", "POST", "DELETE") / Based On The Role
    actionType  : String ,
    // Exact timestamp of the action
    timestamp: {
             type: Date,
            default: Date.now
          },
    // Additional details about the action 
    details  : String

  }

);
// Creating the model for the "actions_log" collection
const Action_log = mongoose.model('Action_log', actionlog_Schema, 'actions_log');

//  Exporting the model
module.exports = Action_log;