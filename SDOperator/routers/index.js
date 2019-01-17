var url = require('url');
var toolkit = require("../toolkit/sd_toolkit");
var cydocker = require('../toolkit/cy_docker');

function sd_router(app) {

    app.get("/sandbox/create", function (req, res) {

        /* 参数获取 */
        var paras = url.parse(req.url, true).query;

        /* 参数检查(可能返回错误) */
        var appType = paras.appType;
        var appConfig = paras.appConfig;
        var os = paras.os;
        var ip = paras.ip;                  /* 暂不参考 */
        var port = paras.port;

        /* 执行命令 */
        var rstObj = cydocker.container_create(appType, appConfig, os, ip, port);
        if (rstObj.code < 0) {
            /* 失败 */
            resInfo = toolkit.sd_res_failed(JSON.parse("{}"), rstObj.code, rstObj.message);
            res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
            res.write(JSON.stringify(resInfo));
            res.end();
            return;
        }

        /* 成功 */
        paras.id = rstObj.conId;
        var resInfo = toolkit.sd_res_success(paras);

        /* 成功消息 */
        res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
        res.write(JSON.stringify(resInfo));
        res.end();
    });

    app.get("/sandbox/remove", function (req, res) {

        /* 参数获取 */
        var paras = url.parse(req.url, true).query;
        var sdId = paras.id;

        /* 参数检查(可能返回错误) */

        /* 功能处理 */
        var rstObj = cydocker.container_remove(sdId);
        if (rstObj.code < 0) {
            /* 失败 */
            resInfo = toolkit.sd_res_failed(JSON.parse("{}"), rstObj.code, rstObj.message);
            res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
            res.write(JSON.stringify(resInfo));
            res.end();
            return;
        }

        /* 删除成功 */
        var resInfo = toolkit.sd_res_success(rstObj.conItems);

        /* 成功消息 */
        res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
        res.write(JSON.stringify(resInfo));
        res.end();
    });

    app.get("/sandbox/selectSingle", function (req, res) {
        /* 参数获取 */
        var paras = url.parse(req.url, true).query;
        var sdId = paras.id;

        /* 参数检查(可能返回错误) */

        /* 功能处理 */
        var rstObj = cydocker.container_select(sdId);
        if (rstObj.code < 0) {
            /* 失败 */
            var resInfo = toolkit.sd_res_failed({}, rstObj.code, rstObj.message);
            res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
            res.write(JSON.stringify(resInfo));
            res.end();
            return;
        }

        var resInfo = toolkit.sd_res_success(rstObj.conItem);

        /* 成功消息 */
        res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
        res.write(JSON.stringify(resInfo));
        res.end();
    });

    app.get("/sandbox/removeAll", function (req, res) {

        /* 参数获取 无参数 */

        /* 参数检查 无参数 */

        /* 功能处理 */
        var rstObj = cydocker.container_removeAll();
        if (rstObj.code < 0) {
            /* 失败 */
            resInfo = toolkit.sd_res_failed({}, rstObj.code, rstObj.message);
            res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
            res.write(JSON.stringify(resInfo));
            res.end();
            return;
        }

        var resInfo = toolkit.sd_res_success(rstObj.conItems);

        /* 成功消息 */
        res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
        res.write(JSON.stringify(resInfo));
        res.end();
    });

    app.get("/sandbox/selectAll", function (req, res) {

        /* 参数获取 无参数 */

        /* 参数检查 无参数 */

        /* 功能处理 */
        var rstObj = cydocker.container_selectAll();
        if (rstObj.code < 0) {
            /* 失败 */
            resInfo = toolkit.sd_res_failed({}, rstObj.code, rstObj.message);
            res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
            res.write(JSON.stringify(resInfo));
            res.end();
            return;
        }

        var resInfo = toolkit.sd_res_success(rstObj.conItems);

        /* 成功消息 */
        res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
        res.write(JSON.stringify(resInfo));
        res.end();
    });
}

module.exports = sd_router;