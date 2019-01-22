/* cy_docker : Chris Yang Docker */

// const { exec } = require('child_process');
var execSync = require('child_process').execSync;
var async = require('async');

/* 待配置参数 */
var serverPortStr = "9999";
var app0 = "inner_server_1";
var app1 = "inner_server_1";
var app2 = "inner_server_2";
var app3 = "inner_server_3";

/* 统一返回一个JsonObj
 * code : 返回码，0位正常
 * message : 返回消息
 * conId : 容器ID
 * conItem : 容器信息
 * */

/* 单沙盒创建：根据特定属性创建一个沙盒 */
function container_create(appName, appConfig, appCommand) {

    var retObj = {
        "code": 0,
        "message": ""
    };

    var cmdStr = "docker run -d ";

    /* 运行配置 */
    if (appConfig) {
        cmdStr = cmdStr + appConfig + " ";
    }

    /* 应用选择 */
    if (appName) {
        cmdStr = cmdStr + appName + " ";
    } else {
        cmdStr = cmdStr + app1 + " ";
    }

    /* 运行命令 */
    if (appCommand) {
        cmdStr = cmdStr + appCommand + " ";
    }

    console.log(cmdStr);
    /* 运行命令 */
    var rstBuffer;
    try {
        rstBuffer = execSync(cmdStr);
    } catch (e) {
        retObj.code = -1;
        retObj.message = shortStr(e.message);
        return retObj;
    }

    /* 获取Id（前20位）*/
    var tmpStr = rstBuffer.toString();
    if (tmpStr.length > 20) {
        tmpStr = tmpStr.substring(0, 20);
    }

    retObj.conId = tmpStr;
    return retObj;
}

/* 单沙盒删除：根据一个Id删除一个沙盒 */
function container_remove(conId) {

    var rstInfo = container_select(conId);
    if (rstInfo.code < 0) {
        return rstInfo;
    }

    var cmdStr = "docker stop " + conId;
    execSync(cmdStr);

    var cmdStr = "docker rm " + conId;
    execSync(cmdStr);

    return rstInfo;
}

/* 单沙盒查找：根据沙盒Id查找一个沙盒 */
function container_select(conId) {

    var retObj = {
        "code": 0,
        "message": ""
    };

    if (conId.length < 10) {
        retObj.code = -1;
        retObj.message = "输入Id不合过短";
        return retObj;
    }

    var subIdStr = conId.substring(0, 10);
    var cmdStr = "docker ps -a | grep " + subIdStr;

    var rstBuffer;
    try {
        rstBuffer = execSync(cmdStr);
    } catch (e) {
        retObj.code = -1;
        retObj.message = shortStr(e.message);
        return retObj;
    }

    var rstStr = rstBuffer.toString();
    rstStr.replace('\n', '');
    var item = container_parserItem(rstStr);
    retObj.conItem = item;

    return retObj;
}

/* 多沙盒删除：删除全部沙盒 */
function container_removeAll() {

    var itemArray = container_selectAll().conItems;
    for (i = 0; i < itemArray.length; i++) {
        container_remove(itemArray[i].containerId);
    }

    var retObj = {
        "code": 0,
        "message": "",
        "conItems": itemArray
    };
    return retObj;
}

/* 多沙盒查找：查找所有沙盒信息 */
function container_selectAll() {

    var retObj = {
        "code": 0,
        "message": ""
    };

    var cmdStr = "docker ps -a";

    var tmpBuf;
    try {
        tmpBuf = execSync(cmdStr);
    } catch (e) {
        retObj.code = -1;
        retObj.message = shortStr(e.message);
        return retObj;
    }

    var rstStr = tmpBuf.toString();
    var lineArray = rstStr.split("\n");

    var itemArray = JSON.parse("[]");
    for (i = 1; i < lineArray.length; i++) {
        if (lineArray[i].length <= 0 ) {
            continue;
        }

        var tmpItem = container_parserItem(lineArray[i]);
        itemArray.push(tmpItem);
    }

    retObj.conItems = itemArray;
    return retObj;
}

/* 支持：解析单行容器信息-->容器数据结构 */
function container_parserItem(itemStr) {

    var tmpArray = itemStr.split(/ [ ]+/);

    var tmpItem = JSON.parse("{}");
    if (tmpArray.length >= 7) {
        tmpItem.containerId = tmpArray[0];
        tmpItem.imageName = tmpArray[1];
        tmpItem.command = tmpArray[2];
        tmpItem.createInfo = tmpArray[3];
        tmpItem.status = tmpArray[4];
        tmpItem.ports = tmpArray[5];
        tmpItem.constainerName = tmpArray[6];
    }

    return tmpItem;
}

function shortStr(inputStr) {
    if (inputStr.length > 50) {
        inputStr = inputStr.substring(0, 50) + "...";
    }
    return inputStr;
}

module.exports.container_create = container_create;
module.exports.container_remove = container_remove;
module.exports.container_select = container_select;
module.exports.container_removeAll = container_removeAll;
module.exports.container_selectAll = container_selectAll;