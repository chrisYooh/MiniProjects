
function onSdCreate() {
    $.get("sandbox/create", function (data, status) {
        $("#sd_testLabel").text(data);
    }.bind(this));
}

function onSdRemove() {
    $.get("sandbox/remove", function (data, status) {
        $("#sd_testLabel").text(data);
    }.bind(this));
}

function onSdSelect() {
    $.get("sandbox/selectSingle", function (data, status) {
        $("#sd_testLabel").text(data);
    }.bind(this));
}

function onSdSelectAll() {
    $.get("sandbox/selectAll", function (data, status) {
        $("#sd_testLabel").text(data);
    }.bind(this));
}


