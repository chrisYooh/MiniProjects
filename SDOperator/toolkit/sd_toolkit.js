/* sd_toolkit : Sandbox Docker Toolkit */

/*
 * 成功消息
 * 输入：
 *  data: 返回的数据，一个JSON对象
 *  code: 返回码，正确为0
 *  msg: 返回消息
 * 返回：一个Json对象
 */

function sd_res_success(data) {

    var resJson = JSON.parse("{}");
    resJson.code = "0";
    resJson.errMsg = "success";
    resJson.data = data;

    return resJson;
}

function sd_res_failed(data, code, msg) {

    var resJson = JSON.parse("{}");
    resJson.code = code;
    resJson.errMsg = msg;
    resJson.data = data;

    return resJson;
}

module.exports.sd_res_success = sd_res_success;
module.exports.sd_res_failed = sd_res_failed;
