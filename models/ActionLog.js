const mongoose = require('mongoose');

 

const actionlog_Schema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users' 
    } ,
    actionType  : String ,
    timestamp: {
             type: Date,
            default: Date.now
          },
    details  : String

  }

);
const Action_log = mongoose.model('Action_log', actionlog_Schema, 'actions_log');

module.exports = Action_log;