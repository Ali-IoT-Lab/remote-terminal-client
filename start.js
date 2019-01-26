const os = require("os");
const fs = require("fs");
const path = require("path");
const child_process = require("child_process");
const paths = require('./lib/paths.js');

var newVersion = process.argv[2];
var HOME="";

if(os.platform() == 'linux') {
  HOME='home'
}
if(os.platform() == 'darwin'){
  HOME='Users'
}

if(fs.existsSync(path.join('/', HOME, 'moja', 'install-mode'))) { //curl安装方式判断
  process.env.PATH=`${process.env.PATH}:/${HOME}/moja/nodejs/bin`;
}

var pm2Json=`
{
  "apps": [
    {
      "name": "client-v${newVersion}",
      "script": "${os.homedir()}/.moja/client/v${newVersion}/node_modules/remote-terminal-client/app.js",
      "error_file": "/var/tmp/client-logs/err.log",
      "out_file": "/var/tmp/client-logs/out.log",
    }
  ]
}
`;

//判断根据版本号判断当前启动是否为升级启动 若为升级起动则删除旧版本进程
var oldVersion = fs.readFileSync(paths.MOJA_VERSION_PATH).toString().replace(/(\r|\n)/gi, "");
if(oldVersion != newVersion) {
  child_process.execSync(`sh ${path.resolve(path.join(__dirname, "./operation/killApp.sh"))} ${newVersion}`);
}

var pm2JsonPath = `${os.homedir()}/.moja/client/v${newVersion}/node_modules/remote-terminal-client/pm2.json`;

fs.writeFileSync(pm2JsonPath, pm2Json, {flag: 'w+' });
var cmd = `${os.homedir()}/.moja/pmtwo/node_modules/pm2/bin/pm2 start ${pm2JsonPath}`;

var uout = "",
    uerr = "";
var startApp = child_process.exec(cmd, { maxBuffer : 10*1000 * 1024 });

startApp.stdout.on("data", (trunk) => {
  uout += trunk;
});
startApp.stderr.on("data", (trunk) => {
  uerr += trunk;
});
startApp.on("error", (error) => {
  console.error(`[(${new Date()})  start remote-terminal-client] exec start command with error: ${error}`);
});
startApp.on("exit", (code, signal) => {
  console.log(`[ + (${new Date()}) start remote-terminal-client] exit start application with code: ${code} ,stdout: ${uout} ,stderr: ${uerr}`);
});
