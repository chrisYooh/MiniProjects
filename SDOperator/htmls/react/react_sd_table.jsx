class SdInfoTable extends React.Component {

    constructor(props) {
        super(props);

        this.state = {respInfo: " "};
    }

    componentDidMount () {
        this.handleRefresh();
    }

    htmlItemData = (itemData) => {

        var tmpStr =
            '<tr>' +

            '<td>' + itemData["containerId"] + '</td>' +
            '<td>' + '待配置' + '</td>' +
            '<td>' + '待配置' + '</td>' +
            '<td>' + '待配置' + '</td>' +
            '<td>' + itemData["ports"] + '</td>' +

            '<td>' + itemData["imageName"] + '</td>' +
            '<td>' + itemData["constainerName"] + '</td>' +
            '<td>' + itemData["command"] + '</td>' +
            '<td>' + itemData["createInfo"] + '</td>' +
            '<td>' + itemData["status"] + '</td>' +
            '<td><button>(未实现)</button></td>' +
            '<td><button>(未实现)</button></td>' +

            '</tr>';

        return tmpStr;

    }

    htmlData = (data) => {

        var jsonArray = data;
        var tmpHtml = "";

        for (var i = 0; i < jsonArray.length; i++) {
            var itemData = jsonArray[i];
            tmpHtml += this.htmlItemData(itemData);
        }

        return tmpHtml;
    }

    handleGoHome = () => {
        document.location = "../index.html";
    }

    handleRefresh = () => {

        var reqStr = "sandbox/selectAll";

        $.get(reqStr, function (data, status) {

            var jsonData = JSON.parse(data);
            var code = jsonData.code;
            if (0 != code) {
                alert("沙盒查找失败：" + jsonData.errMsg);
                return;
            }

            var dataTableInfo = this.htmlData(jsonData.data);
            $("#sd_table_body").html(dataTableInfo);

            this.setState({respInfo: data});

        }.bind(this));

        console.log("刷新啦！");
    }

    render() {
        return (
            <div>
                <div className="sd_table_title">已创建的沙盒</div>
                <table className="table table-striped">
                    {/*历史检查列表*/}
                    <thead>
                    <tr>
                        <th>沙盒Id</th>
                        <th>应用Id</th>
                        <th>应用配置</th>
                        <th>操作系统</th>
                        <th>应用端口</th>

                        <th>应用(镜像)名称</th>
                        <th>沙盒(容器)名称</th>
                        <th>启动操作</th>
                        <th>创建信息</th>
                        <th>运行状态</th>
                        <th>沙盒服务</th>
                        <th>删除沙盒</th>
                    </tr>
                    </thead>
                    <tbody id="sd_table_body">
                    </tbody>
                </table>
                <button onClick={this.handleGoHome}>小小的返回</button>
                <button onClick={this.handleRefresh}>小小的刷新</button>
                <br /><br /><br />
                <label>原始返回数据</label>
                <label>{this.state.respInfo}</label>
            </div>
        )
    }
}

ReactDOM.render (
    <SdInfoTable />,
    document.getElementById("sd_info_table")
)