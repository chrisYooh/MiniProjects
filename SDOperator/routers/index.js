
var toolkit = require("../toolkit/sd_toolkit");
var url = require('url');

function sd_router(app) {

    app.get("/sandbox/create", function (req, res) {

        /* 参数获取 */
        var paras = url.parse(req.url, true).query;

        /* 参数检查(可能返回错误) */

        /* 功能处理 */

        /* 测试模拟 */
        paras.id = "randomId";
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

        /* 测试模拟 */
        var testRes = JSON.parse("{}");
        testRes.id = sdId;
        testRes.appType = "0";
        testRes.appConfig = "";
        testRes.os = "0";
        testRes.ip = "192.168.4.234";
        testRes.port = "9839";
        testRes.memory = "1g";
        testRes.cpu = "1024";
        var resInfo = toolkit.sd_res_success(testRes);

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

        /* 测试模拟 */
        var testRes = JSON.parse("{}");
        testRes.id = sdId;
        testRes.appType = "0";
        testRes.appConfig = "";
        testRes.os = "0";
        testRes.ip = "192.168.4.234";
        testRes.port = "9839";
        testRes.memory = "1g";
        testRes.cpu = "1024";
        var resInfo = toolkit.sd_res_success(testRes);

        /* 成功消息 */
        res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
        res.write(JSON.stringify(resInfo));
        res.end();
    });

    app.get("/sandbox/selectAll", function (req, res) {

        /* 参数获取 无参数 */
        var paras = url.parse(req.url, true).query;

        /* 参数检查 无参数 */

        /* 功能处理 */

        /* 测试模拟 */
        var singleRes = JSON.parse("{}");
        var testRes = JSON.parse("[]");
        singleRes.appType = "0";
        singleRes.appConfig = "";
        singleRes.os = "0";
        singleRes.ip = "192.168.4.234";
        singleRes.port = "9839";
        singleRes.memory = "1g";
        singleRes.cpu = "1024";
        testRes.push(singleRes);
        testRes.push(singleRes);
        testRes.push(singleRes);
        var resInfo = toolkit.sd_res_success(testRes);

        /* 成功消息 */
        res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
        res.write(JSON.stringify(resInfo));
        res.end();
    });
}

module.exports = sd_router;