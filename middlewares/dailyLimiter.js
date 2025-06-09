const express = require("express");
const { checkAndUpdateDailyActions } = require('../services/UserService');

const checkAndUpdateDailyActions  = async (req, res, next) => {
  try {
    const result = await checkAndUpdateDailyActions(req.user.id);
    if (result.status === 'LIMIT_REACHED') {
      return res.status(429).json({ msg: 'Daily limit reached' });
    }
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

module.exports = {
    checkAndUpdateDailyActions
}

