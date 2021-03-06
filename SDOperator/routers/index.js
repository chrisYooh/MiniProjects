var url = require('url');
var toolkit = require("../toolkit/sd_toolkit");
var cydocker = require('../toolkit/cy_docker');
var execSync = require('child_process').execSync;

function sd_router(app) {

    app.get("/sandbox/create", function (req, res) {

        /* 参数获取 */
        var paras = url.parse(req.url, true).query;

        /* 参数检查(可能返回错误) */
        var appName = paras.appName;        /* 应用名称（image名称） */
        var appConfig = toolkit.unicode_de(paras.appConfig);    /* 启动配置 */
        var appCommand = toolkit.unicode_de(paras.appCommand);  /* 启动命令 */

        /* 执行命令 */
        var rstObj = cydocker.container_create(appName, appConfig, appCommand);
        if (rstObj.code < 0) {
            toolkit.sd_http_set_failed(res, rstObj);
            return;
        }

        /* 添加成功 */
        toolkit.sd_http_set_success(res, rstObj.conItem);
    });

    app.get("/sandbox/remove", function (req, res) {

        /* 参数获取 */
        var paras = url.parse(req.url, true).query;
        var sdId = paras.id;

        /* 功能处理 */
        var rstObj = cydocker.container_remove(sdId);
        if (rstObj.code < 0) {
            toolkit.sd_http_set_failed(res, rstObj);
            return;
        }

        /* 删除成功 */
        toolkit.sd_http_set_success(res, rstObj.conItem);
    });

    app.get("/sandbox/select", function (req, res) {

        /* 参数获取 */
        var paras = url.parse(req.url, true).query;
        var sdId = paras.id;

        /* 功能处理 */
        var rstObj = cydocker.container_select(sdId);
        if (rstObj.code < 0) {
            toolkit.sd_http_set_failed(res, rstObj);
            return;
        }

        /* 成功消息 */
        toolkit.sd_http_set_success(res, rstObj.conItem);
    });

    app.get("/sandbox/removeAll", function (req, res) {

        /* 功能处理 */
        var rstObj = cydocker.container_removeAll();
        if (rstObj.code < 0) {
            toolkit.sd_http_set_failed(res, rstObj);
            return;
        }

        /* 成功消息 */
        toolkit.sd_http_set_success(res, rstObj.conItems);
    });

    app.get("/sandbox/selectAll", function (req, res) {

        /* 功能处理 */
        var rstObj = cydocker.container_selectAll();
        if (rstObj.code < 0) {
            toolkit.sd_http_set_failed(res, rstObj);
            return;
        }

        /* 成功消息 */
        toolkit.sd_http_set_success(res, rstObj.conItems);
    });

    app.get("/common/cmdExec", function (req, res) {

        /* 参数获取 */
        var paras = url.parse(req.url, true).query;
        var uniCmd = paras.cmd;

        /* 功能处理 */
        var cmdStr = toolkit.unicode_de(uniCmd);
        var rstBuffer;
        try {
            rstBuffer = execSync(cmdStr);
        } catch (e) {
            /* 出错  */
            var tmpObj = {
                "code": -1,
                "message": e.message
            }
            toolkit.sd_http_set_failed(res, tmpObj);
            return;
        }

        /* 成功消息 */
        var tmpSuccessObj = {
            "resp": rstBuffer.toString()
        }
        toolkit.sd_http_set_success(res, tmpSuccessObj);
    })
}

module.exports = sd_router;