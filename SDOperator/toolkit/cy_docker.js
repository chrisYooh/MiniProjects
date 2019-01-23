/* cy_docker : Chris Yang Docker */

// const { exec } = require('child_process');
var execSync = require('child_process').execSync;
var async = require('async');

/* 待配置参数 */
var serverPortStr = "9999";
var app0 = "inner_server_1";


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
        cmdStr = cmdStr + app0 + " ";
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
        retObj.message += "沙盒创建失败";
        retObj.message += shortStr(e.message);
        return retObj;
    }

    /* 查找沙盒信息 */
    var tmpIdStr = rstBuffer.toString();
    var rstInfo = container_select(tmpIdStr);
    if (rstInfo.code < 0) {
        return rstInfo;
    }

    return rstInfo;
}

/* 单沙盒删除：根据一个Id删除一个沙盒 */
function container_remove(conId) {

    var rstInfo = container_select(conId);
    if (rstInfo.code < 0) {
        return rstInfo;
    }

    var cmdStr = "docker stop " + conId;
    execSync(cmdStr);

    cmdStr = "docker rm " + conId;
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
        retObj.message = "输入Id不合法，过短";
        return retObj;
    }

    var subIdStr = conId.substring(0, 10);
    var cmdStr = "docker inspect " + subIdStr;

    var rstBuffer;
    try {
        rstBuffer = execSync(cmdStr);
    } catch (e) {
        retObj.code = -1;
        // retObj.message = shortStr(e.message);
        retObj.message = "获取沙盒信息失败，沙盒可能不存在";
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
    var retObj = {
        "code": 0,
        "message": "",
        "conItems": itemArray
    };

    /* 无可删除项目 */
    if (itemArray.length <= 0) {
        return retObj;
    }

    /* 组织删除命令 */
    var idsStr = "";
    for (var i = 0; i < itemArray.length; i++) {
        idsStr = idsStr + itemArray[i].id + " ";
    }

    /* 批量停止容器 */
    var cmdStr = "docker stop " + idsStr;
    execSync(cmdStr);

    /* 批量删除容器 */
    cmdStr = "docker rm " + idsStr;
    execSync(cmdStr);

    return retObj;
}

/* 多沙盒查找：查找所有沙盒信息 */
function container_selectAll() {

    var retObj = {
        "code": 0,
        "message": ""
    };

    /* 查找现存container Id信息 */
    var cmdStr = "docker ps -a | awk '{print $1}'";
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

    /* 组织返回信息 */
    var itemArray = [];
    for (var i = 1; i < lineArray.length; i++) {
        if (lineArray[i].length <= 0 ) {
            continue;
        }

        var rstInfo = container_select(lineArray[i]);
        if (rstInfo.code < 0) {
            continue;
        }

        itemArray.push(rstInfo.conItem);
    }

    retObj.conItems = itemArray;
    return retObj;
}

/* 支持：解析单行容器信息-->容器数据结构 */
function container_parserItem(itemStr) {

    var jsonObj = JSON.parse(itemStr);


    var info_id = jsonObj[0].Id;
    if (info_id.length > 20) {
        info_id = info_id.substring(0, 20);
    }
    var info_appName = jsonObj[0].Config.Image;
    var info_appCommand = "";
    for (var tmpIndex in jsonObj[0].Config.Cmd) {
        info_appCommand = info_appCommand + jsonObj[0].Config.Cmd[tmpIndex] + " ";
    }
    var info_os = jsonObj[0].Platform;
    var info_portMap = "";
    var tmpPortsInfo = jsonObj[0].NetworkSettings.Ports;
    for (var tmpKey in tmpPortsInfo) {
        for (var tmpIndex in tmpPortsInfo[tmpKey]) {
            info_portMap = info_portMap + tmpPortsInfo[tmpKey][tmpIndex].HostPort + "->";
        }
        info_portMap = info_portMap + tmpKey;
    }
    var info_sdName = jsonObj[0].Name;
    info_sdName = info_sdName.replace("/", "");
    var info_createTime = jsonObj[0].Created;
    var info_lastStartTime = jsonObj[0].State.StartedAt;

    var tmpItem = {
        "id": info_id,
        "appName": info_appName,
        "appCommand": info_appCommand,
        "platform": info_os,
        "portMap": info_portMap,
        "sandboxName": info_sdName,
        "createTime": info_createTime,
        "lastStartTime": info_lastStartTime
    };

    return tmpItem;
}

function shortStr(inputStr) {
    if (inputStr.length > 100) {
        inputStr = inputStr.substring(0, 100) + "...";
    }
    return inputStr;
}

module.exports.container_create = container_create;
module.exports.container_remove = container_remove;
module.exports.container_select = container_select;
module.exports.container_removeAll = container_removeAll;
module.exports.container_selectAll = container_selectAll;