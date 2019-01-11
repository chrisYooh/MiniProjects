
var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var fs = require('fs');

var app = express();
app.use(express.static('htmls'));
app.use(bodyParser.urlencoded({ extended: false }));

var router = require("./routers")(app);
var server = app.listen(9999, function () {

    var host = server.address().host;
    var port = server.address().port;

    console.log("服务地址: http://%s:%s", host, port);
});