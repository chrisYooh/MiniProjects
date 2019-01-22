/*****************************************************  Sandbox Info  *****************************************************/
class SdInfoItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {itemValue: " "};

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({itemValue: event.target.itemValue});
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
                <SdInfoItem itemTitle="ID" />
                <SdInfoItem itemTitle="系统" />
                <SdInfoItem itemTitle="IP" />
                <SdInfoItem itemTitle="端口" />
                <SdInfoItem itemTitle="其他配置" />
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
    }

    sd_create = () => {
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
    };

    sd_remove = () => {
        var reqStr = "sandbox/remove"
            + "?id=123";

        $.get(reqStr, function (data, status) {
            $("#sd_testLabel").text(data);
        }.bind(this));
    };

    sd_select = () => {
        var reqStr = "sandbox/selectSingle"
            + "?id=123";

        $.get(reqStr, function (data, status) {
            $("#sd_testLabel").text(data);
        }.bind(this));
    };

    sd_remove_all = () => {
        var reqStr = "sandbox/removeAll";

        $.get(reqStr, function (data, status) {
            $("#sd_testLabel").text(data);
        }.bind(this));
    };

    sd_select_all = () => {
        var reqStr = "sandbox/selectAll";

        $.get(reqStr, function (data, status) {
            $("#sd_testLabel").text(data);
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
                    <SandboxInfo />
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
                <label id="sd_testLabel">xxx</label>

            </div>
        )
    }
};

/*****************************************************  Render  *****************************************************/

ReactDOM.render(
    <SdMainpage />,
    document.getElementById('mainpage')
);
