/* sd_toolkit : Sandbox Docker Toolkit */

/*
 * 直接处理http成功返回数据
 * data : 业务返回数据
 */
function sd_http_set_success(res, data) {
    var resInfo = sd_res_success(data);
    res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
    res.write(JSON.stringify(resInfo));
    res.end();
}

/*
 * 直接处理http失败返回数据
 * res : get回调方法中的返回对象
 * errObj : 含code 和 message 两个属性
 */
function sd_http_set_failed(res, errObj) {
    resInfo = sd_res_failed({}, errObj.code, errObj.message);
    res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
    res.write(JSON.stringify(resInfo));
    res.end();
}

/* 成功返回数据 */
function sd_res_success(data) {

    var resJson = JSON.parse("{}");
    resJson.code = "0";
    resJson.errMsg = "success";
    resJson.data = data;

    return resJson;
}

/* 失败返回数据 */
function sd_res_failed(data, code, msg) {

    var resJson = JSON.parse("{}");
    resJson.code = code;
    resJson.errMsg = msg;
    resJson.data = data;

    return resJson;
}

function unicode_en(str) {

    if (!str) {
        return str;
    }

    var res = [];
    for ( var i=0; i<str.length; i++ ) {
        res[i] = ( "00" + str.charCodeAt(i).toString(16) ).slice(-4);
    }
    return "\\u" + res.join("\\u");
}

function unicode_de(str) {

    if (!str) {
        return str;
    }

    str = str.replace(/\\/g, "%");
    //转换中文
    str = unescape(str);
    //将其他受影响的转换回原来
    str = str.replace(/%/g, "\\");
    //对网址的链接进行处理
    str = str.replace(/\\/g, "");
    return str;
}

module.exports.sd_http_set_success = sd_http_set_success;
module.exports.sd_http_set_failed = sd_http_set_failed;
module.exports.sd_res_success = sd_res_success;
module.exports.sd_res_failed = sd_res_failed;
module.exports.unicode_en = unicode_en;
module.exports.unicode_de = unicode_de;
