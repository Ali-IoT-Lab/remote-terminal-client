var p     = require('path');
var os     = require('os');
var fs     = require('fs');

function getMojaPath() {
  var HOME="";
  if (os.platform() == 'darwin'){
    HOME='Users'
  }
  if (os.platform() == 'linux'){
    HOME='home'
  }
  return HOME;
}

if(fs.existsSync(p.join('/',getMojaPath(),'moja', 'install-mode'))){
  var MOJA_HOME = p.join('/',getMojaPath(),'moja','.moja');
}else {
  var MOJA_HOME = p.join(os.homedir(),'.moja');
}

module.exports = {
    TERMINAL_ID_PATH         : p.resolve(MOJA_HOME, 'terminalId.js'),
    PUBLIC_KEY_PATH          : p.resolve(MOJA_HOME, 'publicKey.js'),
    EMAIL_PATH               : p.resolve(MOJA_HOME, 'email.js'),
    USER_ID_PATH             : p.resolve(MOJA_HOME, 'userId.js'),
    MOJA_VERSION_PATH        : p.resolve(MOJA_HOME, 'moja-version'),
    MOJA_STAGE_PATH          : p.resolve(MOJA_HOME, 'stage'),
    MOJA_UNISTALL_PATH       : p.resolve(MOJA_HOME, 'uninstall.log'),
    MOJA_UPDATE_PATH         : p.resolve(MOJA_HOME, 'update.log'),
    DOWNLOAD_PATH            : p.resolve(MOJA_HOME, 'client/tmpFile'),
    MOJA_DOWNLOAD_PATH       : p.resolve(MOJA_HOME, `client/remote-terminal-client-v${clientVersion}/lib/downloadFile.js`),
};
