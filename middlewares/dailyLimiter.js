const express = require("express");
const { checkAndUpdateDailyActions } = require('../services/UserService');

// Middleware to check and update the user's daily action limit.
// If the limit is reached, it blocks further actions for that user
const checkAndUpdateDailyAction  = async (req, res, next) => {
  try {
    // Check if the user has remaining daily actions
    const result = await checkAndUpdateDailyActions(req.user.id);

    // If the limit has been reached, respond with HTTP 429 (Too Many Requests)
    if (result.status === 'LIMIT_REACHED') {
      return res.status(429).json({ msg: 'Daily limit reached' });
    }

    // If under the limit, continue to the next middleware/controller
    next();
  } catch (err) {
    console.error(err);

    // Respond with server error in case of any unexpected issue
    res.status(500).json({ msg: 'Server error' });
  }
};

// Exports
module.exports = {
    checkAndUpdateDailyAction
}

