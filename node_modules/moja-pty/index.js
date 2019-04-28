var moduleName = require('./scripts/config.js').moduleName;

var mojaPty = function () {
  return require(moduleName);
};

module.exports = {
  "moja_pty" : mojaPty()
};

