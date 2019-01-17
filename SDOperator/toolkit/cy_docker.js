/* cy_docker : Chris Yang Docker */

// const { exec } = require('child_process');
var execSync = require('child_process').execSync;
var async = require('async');

/**
 * 运行一个Container，并返回其运行Id
 * @param runStr
 */
function container_run(runStr) {
    console.log("执行命令：", runStr);
    var rstBuffer = execSync(runStr);
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

module.exports.container_run = container_run;