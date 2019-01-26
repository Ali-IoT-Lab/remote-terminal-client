const https = require("https");
const exec = require("child_process").exec;
const config = require('../config/config.js');

function getShellExecLog(terminalId,scriptId,userId,callback) {
  var url=config.httProtocol+config.HOST+config.getScriptUrl+"/"+scriptId+"/"+userId;
  var req = https.get(url, res => {
    var cmd = "";
    res.on("data", (chunk) => {
      cmd += chunk;
    })
    res.on("end", () => {
      execShellLog(cmd, terminalId, scriptId,userId ,callback);
      console.log('[' + (new Date()) + ' recv operation] response operation '+scriptId+' operation content: ' + cmd+" ,terminalId: "+ terminalId+" ,userId: " + userId+" ,scriptId: "+scriptId);
    });
    res.on("error", (error) => {
      callback(error, null);
      console.error('[' + (new Date()) + ' response operation] response operation '+scriptId+' with error: ' + error+" ,terminalId: "+ terminalId+" ,userId: " + userId+" ,scriptId: "+scriptId);
    })
  });
  req.on("error", (error) => {
    callback(error, null);
    console.error('[' + (new Date()) + ' request operation] request operation '+scriptId+' with error: ' + error+" ,terminalId: "+ terminalId+" ,userId: " + userId+" ,scriptId: "+scriptId);
  })
  req.end();
}

function execShellLog(cmd, terminalId, scriptId,userId, callback){
  var execShell = exec(cmd, { maxBuffer : 10000 * 1024 });
  var uout = "", uerr = "";
  execShell.stdout.on("data", (trunk) => {
    uout += trunk;
  });
  execShell.stderr.on("data", (trunk) => {
    uerr += trunk;
  });
  execShell.on("error", (error) => {
    sendLog(JSON.stringify({terminalId:terminalId,shellId:scriptId,logString:error,userId:userId}),terminalId, scriptId,"error", callback);
    console.error('[' + (new Date()) + ' exec operation] exec operation '+scriptId+' with error: ' + error+" ,terminalId: "+ terminalId+" ,userId: " + userId+" ,scriptId: "+scriptId);
  });
  execShell.on("exit", (code, signal) => {
    console.log('[' + (new Date()) + ' exit operation] exit operation '+scriptId+' with code: ' + code+" ,stdout: " + uout + " ,stderr: " + uerr+" ,terminalId: "+ terminalId+" ,userId: " + userId+" ,scriptId: "+scriptId);
    if(code == null || code == 0) {
      sendLog(JSON.stringify({terminalId:terminalId,shellId:scriptId,logString:uout,userId:userId}),terminalId, scriptId,'stdout',callback);
    }else {
      sendLog(JSON.stringify({terminalId:terminalId,shellId:scriptId,logString:uerr,userId:userId}),terminalId, scriptId,'stderr',callback);
    }
  });
  execShell.on("close", (code, signal) => {
    console.log('[' + (new Date()) + ' close operation] close operation '+scriptId+' with code: ' + code+" ,terminalId: "+ terminalId+" ,userId: " + userId+" ,scriptId: "+scriptId);
  });
}
function sendLog(logData,terminalId, scriptId,result, callback) {
  var option = {
    hostname: config.ipAddress,
    port:config.PORT,
    path: config.postLogUrl,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': logData.length
    }
  };
  var req = https.request(option, (res) => {
    var str = '';
    res.on('data', function(chunk){
      str += chunk;
    });
    res.on('end', () => {
      callback(null, result);
      console.log('[' + (new Date()) + ' response logPost] response logPost, option: '+JSON.stringify(option)+' end, recv Data: ' + str+" ,terminalId: "+terminalId+" ,scriptId: "+ scriptId);
    });
    res.on('error', (error) => {
      callback(error, result);
      console.error('[' + (new Date()) + ' response logPost] response logPost, option: '+JSON.stringify(option)+' with error: ' + error+' ,recv Data: ' + str+" ,terminalId: "+terminalId+" ,scriptId: "+ scriptId);
    });
  });
  req.on("error", (error) => {
    callback(error, result);
    console.error('[' + (new Date()) + ' request logPost] request logPost, option: '+JSON.stringify(option)+' with error: ' + error+' ,recv Data: ' + str+" ,terminalId: "+terminalId+" ,scriptId: "+ scriptId);
  })
  req.write(logData);
  req.end();
}
exports.getShellExecLog = getShellExecLog;

