const actions_log = require("../models/ActionLog");

// Repository functions for the Actions Log collection

// Get all action logs
const getAll = async()=>{
    return await actions_log.find();
}

// Get all logs of a specific user
const getByUserId = async(userId) => {
    return await actions_log.find({ userId });  
}

// Get all logs on a specific date
const getByDate = async(date) => {
    return await actions_log.find({ 
        timestamp: {
            $gte: new Date(date),
            $lt: new Date(date + 86400000) // יום שלם
        }
    });
}

//  Add a new action log entry
const addLog = async(newLog)=>{
    return await actions_log.create(newLog);
    
}

// Get all logs by user and date
const getByUserIdAndDate = async (userId, date) => {
  const start = new Date(date);
  const end   = new Date(start.getTime() + 24*60*60*1000);
  return await actions_log.find({
    userId,
    timestamp: { $gte: start, $lt: end }
  });
};

// Count how many actions a user has done on a specific day
const countByUserIdAndDate = async (userId, date) => {
  const start = new Date(date);
  const end   = new Date(start.getTime() + 24*60*60*1000);
  return await actions_log.countDocuments({
    userId,
    timestamp: { $gte: start, $lt: end }
  });
};

// Exports
module.exports = {
    getAll,
    addLog,
    getByUserId,
    getByDate,
    getByUserIdAndDate,
    countByUserIdAndDate




}