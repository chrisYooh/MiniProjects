
var url = require('url');

function sd_router(app) {

    app.get("/sandbox/create", function (req, res) {

        // var paras = url.parse(req.url, true).query;
        // var appType = paras.appType;
        // var os = paras.os;
        // var ip = paras.ip;
        // var port = paras.port;
        // var memory = paras.memory;
        // var cpu = paras.cpu;

        console.log("Create Sandbox")
        res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
        res.write("Create Sandbox");
        res.end();
    });

    app.get("/sandbox/remove", function (req, res) {
        console.log("Remove Sandbox")
        res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
        res.write("Remove Sandbox");
        res.end();
    });

    app.get("/sandbox/selectSingle", function (req, res) {
        console.log("Select Single Sandbox")
        res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
        res.write("Select Single Sandbox");
        res.end();
    });

    app.get("/sandbox/selectAll", function (req, res) {
        console.log("Select All Sandbox")
        res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
        res.write("Select All Sandbox");
        res.end();
    });
}

module.exports = sd_router;