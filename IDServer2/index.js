/* ID = In Docker */

var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');

var app = express();
app.use(express.static('htmls'));
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/serverInfo", function (req, res) {

    var host = server.address().host;
    var port = server.address().port;

    res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
    res.write("第二个测试服务地址: http:" + host + ":" + port);
    res.end();
});

var server = app.listen(9999, function () {

    var host = server.address().host;
    var port = server.address().port;

    console.log("服务地址: http://%s:%s", host, port);
});
