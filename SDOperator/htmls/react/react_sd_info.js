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
            <div className="sdinfo_item">
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
            <div className="sdinfo_board">
                <p1 className="sdinfo_title">沙盒信息</p1>
                <p2 className="sdinfo_opinfo">最近操作: {this.state.sdOpName}</p2>
                <SdInfoItem itemTitle="ID" />
                <SdInfoItem itemTitle="系统" />
                <SdInfoItem itemTitle="IP" />
                <SdInfoItem itemTitle="端口" />
                <SdInfoItem itemTitle="其他配置" />
            </div>
        );
    }
};

ReactDOM.render(
    <SandboxInfo />,
    document.getElementById('mainpage_sd_info')
);