const os = require("os");
const child_process = require("child_process");
var logPath="/var/tmp/client-logs";

//定时pm2命令路径
var pm2Pth=`${os.homedir()}/.moja/pmtwo/node_modules/pm2/bin/pm2`;
//定义客户端启动文件路径
var appPath=`${os.homedir()}/.moja/client/node_modules/remote-terminal-client/app.js`;
//定义pm2启动参数
var startParam = `--log-type json --merge-logs --log-date-format="YYYY-MM-DD HH:mm:ss Z" -o ${logPath}/out.log -e ${logPath}/err.log --name client-v${lastVersion}`;

var cmd = `${pm2Pth} start ${appPath} ${startParam}`;

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
