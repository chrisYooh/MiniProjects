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

module.exports.sd_http_set_success = sd_http_set_success;
module.exports.sd_http_set_failed = sd_http_set_failed;
module.exports.sd_res_success = sd_res_success;
module.exports.sd_res_failed = sd_res_failed;
