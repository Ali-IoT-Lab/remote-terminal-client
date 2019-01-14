const fs = require('fs');
const os = require('os');
const p = require('path');
const Base64 = require('js-base64').Base64;
var MOJA_HOME = "";
;if(process.argv[3] == 'err'){
  console.log(Base64.decode(process.argv[2]))
}else {
  var baseFileName = process.argv[2];
  var fileName = Base64.decode(baseFileName);
  var HOME = "";
  if (os.platform() == 'darwin'){
    HOME='Users'
  }

  if (os.platform() == 'linux'){
    HOME='home'
  }

  if(fs.existsSync(p.join('/',HOME,'moja','install-mode'))){
    MOJA_HOME = p.join('/',HOME,'moja','.moja');
  }else{
    MOJA_HOME = p.join(os.homedir(),'.moja');
  }

  fs.rename(`${MOJA_HOME}/client/tmpFile/${baseFileName}`, `./${fileName}`, function (err) {
    if(err) {
      console.error(err);
    }
  });
}
