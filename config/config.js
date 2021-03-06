
var defaultConfig  = require('./default');
var productionConfig = require('./production');
var environment = "production";

if ("production" == process.env.NODE_ENV) {
  environment = process.env.NODE_ENV;
}

module.exports = ('default' == environment) ? defaultConfig : productionConfig;
