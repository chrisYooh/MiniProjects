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

    handleClick() {

    }

    render() {
        return (
            <button className="sdop_button">{this.props.title}</button>
        )
    }
}

class SandboxOp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {isToggleOn: true};

        // 这边绑定是必要的，这样 `this` 才能在回调函数中使用
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
    }

    render() {
        return (
            <div className="sdop_board chris_coltopflex">
                <div className="sdop_title">操作</div>
                <SdOpButton title="添加沙盒" />
                <SdOpButton title="删除沙盒" />
                <SdOpButton title="查找一个沙盒" />
                <SdOpButton title="删除所有沙盒" />
                <SdOpButton title="查找所有沙盒" />
                {/*<button id="sd_create" onClick="onSdCreate()">添加沙盒</button>*/}
                {/*<button id="sd_remove" onClick="onSdRemove()">删除沙盒</button>*/}
                {/*<button id="sd_select" onClick="onSdSelect()">查找一个沙盒</button>*/}
                {/*<button id="sd_remove_all" onClick="onSdRemoveAll()">删除所有沙盒</button>*/}
                {/*<button id="sd_select_all" onClick="onSdSelectAll()">查找所有沙盒</button>*/}
                {/*<br/>*/}
                {/*<label id="sd_testLabel">*/}
                {/*暂无数据*/}
                {/*</label>*/}
            </div>
        );
    }
}

/*****************************************************  Mainpage  *****************************************************/

class SdMainpage extends React.Component {

    constructor (props) {
        super(props)
    }

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
                    <SandboxOp className="mainpage_sd_op"/>
                </div>

            </div>
        )
    }
};

/*****************************************************  Render  *****************************************************/

ReactDOM.render(
    <SdMainpage />,
    document.getElementById('mainpage')
);
