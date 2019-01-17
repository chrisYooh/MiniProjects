var url = require('url');
var toolkit = require("../toolkit/sd_toolkit");
var cydocker = require('../toolkit/cy_docker');

function sd_router(app) {

    app.get("/sandbox/create", function (req, res) {

        /* 参数获取 */
        var paras = url.parse(req.url, true).query;

        /* 参数检查(可能返回错误) */
        var appType = paras.appType;        /* 应用类型 */
        var appConfig = paras.appConfig;    /* 执行配置 */
        var os = paras.os;                  /* 系统 */
        var ip = paras.ip;                  /* IP地址 */
        var port = paras.port;              /* 端口 */

        /* 执行命令 */
        var rstObj = cydocker.container_create(appType, appConfig, os, ip, port);
        if (rstObj.code < 0) {
            toolkit.sd_http_set_failed(res, rstObj);
            return;
        }

        /* 成功 */
        paras.id = rstObj.conId;
        toolkit.sd_http_set_success(res, paras);
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

    app.get("/sandbox/selectSingle", function (req, res) {

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
}

module.exports = sd_router;