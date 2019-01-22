/*****************************************************  Sandbox Info  *****************************************************/
class SdInfoItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {itemValue: " "};

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({itemValue: event.target.value});
    }

    render() {
        return (
            <div className="sdinfo_item chris_rowleftflex">
                <label className="sditem_title">{this.props.itemTitle}</label>
                <input className="sditem_value" type="text" value={this.state.itemValue} onChange={this.handleChange} />
            </div>
        )
    }
};

class SandboxInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {sdOpName: "查找沙盒"};
    }

    render() {
        return (
            <div className="sdinfo_board chris_coltopflex">
                <div className="sdinfo_title">沙盒信息</div>
                <div className="sdinfo_opinfo">最近操作: {this.state.sdOpName}</div>
                <SdInfoItem itemTitle="ID" ref="ref_item_id"/>
                <SdInfoItem itemTitle="应用类型" ref="ref_item_appType"/>
                <SdInfoItem itemTitle="应用配置" ref="ref_item_appConfig"/>
                <SdInfoItem itemTitle="系统" ref="ref_item_system"/>
                <SdInfoItem itemTitle="IP" ref="ref_item_ip"/>
                <SdInfoItem itemTitle="端口" ref="ref_item_port"/>

            </div>
        );
    }
}

/*****************************************************  Sandbox Operation  *****************************************************/

class SdOpButton extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <button
                className="sdop_button"
                onClick={this.props.opCallback}
            >
                {this.props.title}
            </button>
        )
    }
}

class SandboxOp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {isToggleOn: true};
    }

    render() {
        return (
            <div className="sdop_board chris_coltopflex">
                <div className="sdop_title">操作</div>
                <SdOpButton title="添加沙盒" opCallback={this.props.sd_create} />
                <SdOpButton title="删除沙盒" opCallback={this.props.sd_remove} />
                <SdOpButton title="查找一个沙盒" opCallback={this.props.sd_select} />
                <SdOpButton title="删除所有沙盒" opCallback={this.props.sd_remove_all} />
                <SdOpButton title="查找所有沙盒" opCallback={this.props.sd_select_all} />
            </div>
        );
    }
}

/*****************************************************  Mainpage  *****************************************************/

class SdMainpage extends React.Component {

    constructor (props) {
        super(props)

        this.state = {respVal: "暂无信息"}
    }

    //创建沙盒
    sd_create = () => {

        var paraAppType = this.refs.ref_sdInfo.refs.ref_item_appType.state.itemValue;
        var paraAppConfig = this.refs.ref_sdInfo.refs.ref_item_appConfig.state.itemValue;
        var paraOs = this.refs.ref_sdInfo.refs.ref_item_system.state.itemValue;
        var paraIp = this.refs.ref_sdInfo.refs.ref_item_ip.state.itemValue;
        var paraPort = this.refs.ref_sdInfo.refs.ref_item_port.state.itemValue;

        var reqStr = "sandbox/create"
            + "?appType=" + paraAppType
            + "&appConfig=" + paraAppConfig
            + "&os=" + paraOs
            + "&ip=" + paraIp
            + "&port=" + paraPort
        ;

        $.get(reqStr, function (data, status) {

            /* 填写网络返回信息 */
            this.setState({respVal: data});

            /* 数据解析 */
            var jsonData = JSON.parse(data);
            var code = jsonData.code;
            if (0 != code) {
                alert("沙盒创建失败" + jsonData.errMsg);
                return;
            }

            var rspId = jsonData.data.id;
            var rspAppType = jsonData.data.appType;
            var rspAppConfig = jsonData.data.appConfig;
            var rspOs = jsonData.data.os;
            var rspIp = jsonData.data.ip;
            var rspPort = jsonData.data.port;

            this.refs.ref_sdInfo.setState({sdOpName: "创建沙盒"});
            this.refs.ref_sdInfo.refs.ref_item_id.setState({itemValue: rspId});
            this.refs.ref_sdInfo.refs.ref_item_appType.setState({itemValue: rspAppType});
            this.refs.ref_sdInfo.refs.ref_item_appConfig.setState({itemValue: rspAppConfig});
            this.refs.ref_sdInfo.refs.ref_item_system.setState({itemValue: rspOs});
            this.refs.ref_sdInfo.refs.ref_item_ip.setState({itemValue: rspIp});
            this.refs.ref_sdInfo.refs.ref_item_port.setState({itemValue: rspPort});
            alert("沙盒 创建成功，详情见 沙盒信息");
        }.bind(this));
    };

    //删除沙盒
    sd_remove = () => {

        var paraId = this.refs.ref_sdInfo.refs.ref_item_id.state.itemValue;

        var reqStr = "sandbox/remove"
            + "?id=" + paraId
        ;

        $.get(reqStr, function (data, status) {

            /* 填写网络返回信息 */
            this.setState({respVal: data});

            /* 数据解析 */
            var jsonData = JSON.parse(data);
            var code = jsonData.code;
            if (0 != code) {
                alert("沙盒删除失败：" + jsonData.errMsg);
                return;
            }

            var rspId = jsonData.data.containerId;
            // var rspAppType = jsonData.data.appType;
            // var rspAppConfig = jsonData.data.appConfig;
            // var rspOs = jsonData.data.os;
            // var rspIp = jsonData.data.ip;
            var rspPort = jsonData.data.ports;

            this.refs.ref_sdInfo.setState({sdOpName: "删除特定沙盒"});
            this.refs.ref_sdInfo.refs.ref_item_id.setState({itemValue: rspId});
            // this.refs.ref_sdInfo.refs.ref_item_appType.setState({itemValue: rspAppType});
            // this.refs.ref_sdInfo.refs.ref_item_appConfig.setState({itemValue: rspAppConfig});
            // this.refs.ref_sdInfo.refs.ref_item_system.setState({itemValue: rspOs});
            // this.refs.ref_sdInfo.refs.ref_item_ip.setState({itemValue: rspIp});
            this.refs.ref_sdInfo.refs.ref_item_port.setState({itemValue: rspPort});

            alert("久等了...沙盒已删除，删除的沙盒信息见 沙盒信息");
        }.bind(this));
    };

    //查找沙盒
    sd_select = () => {

        var paraId = this.refs.ref_sdInfo.refs.ref_item_id.state.itemValue;

        var reqStr = "sandbox/selectSingle"
            + "?id=" + paraId
        ;

        $.get(reqStr, function (data, status) {

            /* 填写网络返回信息 */
            this.setState({respVal: data});

            /* 数据解析 */
            var jsonData = JSON.parse(data);
            var code = jsonData.code;
            if (0 != code) {
                alert("沙盒查找失败：" + jsonData.errMsg);
                return;
            }

            var rspId = jsonData.data.containerId;
            // var rspAppType = jsonData.data.appType;
            // var rspAppConfig = jsonData.data.appConfig;
            // var rspOs = jsonData.data.os;
            // var rspIp = jsonData.data.ip;
            var rspPort = jsonData.data.ports;

            this.refs.ref_sdInfo.setState({sdOpName: "查找特定沙盒"});
            this.refs.ref_sdInfo.refs.ref_item_id.setState({itemValue: rspId});
            // this.refs.ref_sdInfo.refs.ref_item_appType.setState({itemValue: rspAppType});
            // this.refs.ref_sdInfo.refs.ref_item_appConfig.setState({itemValue: rspAppConfig});
            // this.refs.ref_sdInfo.refs.ref_item_system.setState({itemValue: rspOs});
            // this.refs.ref_sdInfo.refs.ref_item_ip.setState({itemValue: rspIp});
            this.refs.ref_sdInfo.refs.ref_item_port.setState({itemValue: rspPort});
            alert("沙盒 查找完成，详情见 沙盒信息");

        }.bind(this));
    };

    //删除所有沙盒
    sd_remove_all = () => {
        var reqStr = "sandbox/removeAll";

        $.get(reqStr, function (data, status) {

            /* 填写网络返回信息 */
            this.setState({respVal: data});

            /* 数据解析 */
            var jsonData = JSON.parse(data);
            var code = jsonData.code;
            if (0 != code) {
                alert("沙盒删除失败：" + jsonData.errMsg);
                return;
            }

            this.refs.ref_sdInfo.setState({sdOpName: "删除所有沙盒"});
            alert("久等了...删除所有沙盒成功！共删除 " + jsonData.data.length + " 个沙盒");

        }.bind(this));
    };

    //查找所有沙盒
    sd_select_all = () => {

        document.location = "../sd_table.html";
        return;

        var reqStr = "sandbox/selectAll";

        $.get(reqStr, function (data, status) {

            /* 填写网络返回信息 */
            this.setState({respVal: data});

            /* 数据解析 */
            var jsonData = JSON.parse(data);
            var code = jsonData.code;
            if (0 != code) {
                alert("沙盒查找失败：" + jsonData.errMsg);
                return;
            }

            this.refs.ref_sdInfo.setState({sdOpName: "查找所有沙盒"});
            alert("信息查找成功，共找到 " + jsonData.data.length + " 个沙盒");

        }.bind(this));
    };

    render() {
        return (
            <div className="mainpage_baseboard flex-col">

                {/* 标题 */}
                <div className="mainpage_titleLabel chris_rowflex">
                    沙盒构建演示Demo - 主页
                </div>

                {/* 内容 */}
                <div id="mainpage_sd_board" className="mainpage_sd_board chris_rowflex">
                    {/* 沙盒信息 */}
                    <SandboxInfo ref="ref_sdInfo"/>
                    {/* 沙盒操作 */}
                    <SandboxOp
                        className="mainpage_sd_op"
                        sd_create={this.sd_create}
                        sd_remove={this.sd_remove}
                        sd_select={this.sd_select}
                        sd_remove_all={this.sd_remove_all}
                        sd_select_all={this.sd_select_all}
                    />
                </div>

                <label>网络返回信息</label>
                <label id="sd_testLabel">{this.state.respVal}</label>

            </div>
        )
    }
};

/*****************************************************  Render  *****************************************************/

ReactDOM.render (
    <SdMainpage />,
    document.getElementById('mainpage')
);
