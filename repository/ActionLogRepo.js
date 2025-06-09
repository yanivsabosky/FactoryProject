const actions_log = require("../models/ActionLog");

// functions 
const getAll = async()=>{
    return await actions_log.find();
}

const getByUserId = async(userId) => {
    return await actions_log.find({ userId });  // כל הלוגים של משתמש ספציפי
}

const getByDate = async(date) => {
    return await actions_log.find({ 
        timestamp: {
            $gte: new Date(date),
            $lt: new Date(date + 86400000) // יום שלם
        }
    });
}


const addLog = async(newLog)=>{
    return await actions_log.create(newLog);
    
}


module.exports = {
    getAll,
    addLog,
    getByUserId,
    getByDate



}