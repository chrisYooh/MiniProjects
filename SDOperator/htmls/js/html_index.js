
function onSdCreate() {

    var reqStr = "sandbox/create"
    + "?appType=0"
    + "&appConfig="
    + "&os=0"
    + "&ip="
    + "&port="
    + "&memory=1g"
    + "&cpu=1024";

    $.get(reqStr, function (data, status) {
        $("#sd_testLabel").text(data);
    }.bind(this));
}

function onSdRemove() {

    var reqStr = "sandbox/remove"
        + "?id=123";

    $.get(reqStr, function (data, status) {
        $("#sd_testLabel").text(data);
    }.bind(this));
}

function onSdSelect() {

    var reqStr = "sandbox/selectSingle"
        + "?id=123";

    $.get(reqStr, function (data, status) {
        $("#sd_testLabel").text(data);
    }.bind(this));
}

function onSdRemove() {

    var reqStr = "sandbox/removeAll";

    $.get(reqStr, function (data, status) {
        $("#sd_testLabel").text(data);
    }.bind(this));
}


function onSdSelectAll() {

    var reqStr = "sandbox/selectAll";

    $.get(reqStr, function (data, status) {
        $("#sd_testLabel").text(data);
    }.bind(this));
}


