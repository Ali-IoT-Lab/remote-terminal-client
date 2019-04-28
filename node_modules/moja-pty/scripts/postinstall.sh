#!/bin/bash

osType=`uname -s|tr '[A-Z]' '[a-z]'`
cpuType=`uname -m`
basepath=$(cd `dirname $0`; pwd)
isX86=$( echo $cpuType | grep "x86" )
isArm=$( echo $cpuType | grep "arm" )
isArmV8=$( echo $cpuType | grep "aarch" )

if [ -n "${isX86}" ] ; then
  npm install node-pty-prebuilt@latest
  echo "module.exports ={moduleName:\"node-pty-prebuilt\"}" > $basepath/config.js
elif [  -n "${isArm}" ] ;then
  npm install node-pty-prebuilt@latest
  echo "module.exports ={moduleName:\"node-pty-prebuilt\"}" > $basepath/config.js
elif [  -n "${isArmV8}" ] ;then
  npm install node-pty@latest
  echo "module.exports ={moduleName:\"node-pty\"}" > $basepath/config.js
else
  echo "--------------------------------------不支持的系统类型---------------------------------------"
  exit 1
fi