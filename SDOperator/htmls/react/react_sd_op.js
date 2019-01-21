class Toggle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isToggleOn: true};

        // 这边绑定是必要的，这样 `this` 才能在回调函数中使用
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState(prevState => ({
            isToggleOn: !prevState.isToggleOn
        }));
    }

    render() {
        return (
            <div className="chris_colflex">
                <button id="sd_create" onClick="onSdCreate()">添加沙盒</button>
                <button id="sd_remove" onClick="onSdRemove()">删除沙盒</button>
                <button id="sd_select" onClick="onSdSelect()">查找一个沙盒</button>
                <button id="sd_remove_all" onClick="onSdRemoveAll()">删除所有沙盒</button>
                <button id="sd_select_all" onClick="onSdSelectAll()">查找所有沙盒</button>
                <br/>
                <label id="sd_testLabel">
                    暂无数据
                </label>
            </div>
        );
    }
}

ReactDOM.render(
    <Toggle />,
    document.getElementById('mainpage_sd_op')
);