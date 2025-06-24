const fs = require('fs');
const ActionLogRepo = require('../repository/ActionLogRepo');
const UserRepo = require('../repository/UserRepo');

// Middleware that logs each user action:
//Updates user's daily action count
// Logs the action to a JSON file
// Logs the action to the database
const LogAction = async (req, res, next) => {
  try {

    // Step 1: Update the user's daily stats
    await UserRepo.updateDailyStats(req.user.id);

    // Step 2: Log the action to a local JSON file
    const log = {
      ts: new Date().toISOString(), // Timestamp
      uid: req.user.id,  // User ID
      method: req.method, // HTTP method (GET, POST)
      url: req.originalUrl // Endpoint path
    };
    fs.appendFile('actionsLog.json', JSON.stringify(log) + ',\n', () => {});

    // Step 3: Log the action to the MongoDB database
    await ActionLogRepo.addLog({
      userId: req.user.id,
      actionType: req.method,
      timestamp: new Date(),
      details: req.originalUrl
    });

    next();
  } catch (error) {
     // Handle specific case where user exceeded their daily action limit
    if (error.message.includes("all your actions")) {
      return res.status(403).json({ message: "You have reached your daily limit" });
    }

    // Handle general server error
    console.error("LogAction error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Exports
module.exports = {
  LogAction
};
