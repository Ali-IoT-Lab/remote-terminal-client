const fs = require('fs');
const os = require('os');
const Base64 = require('js-base64').Base64;

if(process.argv[3] == 'err'){
  console.log(Base64.decode(process.argv[2]))
}else {
  var baseFileName = process.argv[2];
  var fileName = Base64.decode(baseFileName);
  var HOME = "";
  if (os.platform() == 'darwin'){HOME='Users'}
  if (os.platform() == 'linux'){HOME='home'}

  fs.rename(`/${HOME}/moja/.moja/client/tmpFile/${baseFileName}`, `./${fileName}`, function (err) {
    if(err) {
      console.error(err);
    }
  });
}
