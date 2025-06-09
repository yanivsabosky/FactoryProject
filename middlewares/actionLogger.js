const fs = require('fs');
const LogAction = (req, res, next) => {
  const log = {
    ts: new Date().toISOString(),
    uid: req.user.id,
    method: req.method,
    url: req.originalUrl
  };
  fs.appendFile('actionsLog.json', JSON.stringify(log) + ',\n', () => {});
  next();
};

module.exports = {
    LogAction   
}
