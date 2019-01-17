/* cy_docker : Chris Yang Docker */

// const { exec } = require('child_process');
var execSync = require('child_process').execSync;
var async = require('async');

/* 待配置参数 */
var serverPortStr = "9999";
var app0 = "inner_server_1"
var app1 = "inner_server_1"
var app2 = "inner_server_2"
var app3 = "inner_server_3"

function container_create(appType, appConfig, os, ip, port) {

    var cmdStr = "docker run -d ";

    /* 端口处理 */
    if (port.length > 0) {
        cmdStr = cmdStr + "-p " + port + ":" + serverPortStr;
    } else {
        cmdStr += "-P ";
    }

    /* 应用选择 */
    if (1 == appType) {
        cmdStr += app1;
    } else if (2 == appType) {
        cmdStr += app2;
    } else if (3 == appType) {
        cmdStr += app3;
    } else {
        cmdStr += app1;
    }

    /* 执行命令 */
    var rstBuffer = execSync(cmdStr);

    /* 获取Id（前20位）*/
    var tmpStr = rstBuffer.toString();
    if (tmpStr.length > 20) {
        tmpStr = tmpStr.substring(0, 20);
    }

    return tmpStr;
}

function container_infoAll() {
    
}

function container_remove(runStr) {

}

function container_removeAll() {

}

module.exports.container_create = container_create;
module.exports.container_infoAll = container_infoAll;
module.exports.container_remove = container_remove;
module.exports.container_removeAll = container_removeAll;