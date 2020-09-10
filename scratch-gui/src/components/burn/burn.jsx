import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import burnIcon1 from "./shangchuan.svg";
import burnIcon2 from "./dengdaizhong.svg";
import styles from "./burn.css";

class BurnComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            portData: [],
        };
        this.handleClickGetPortData = this.handleClickGetPortData.bind(this);
        this.handleSetSelestValue = this.handleSetSelestValue.bind(this);
    }

    componentDidMount() {
        this.handleClickGetPortData();
    }
    // 获取选择框的value并穿给父组件
    handleSetSelestValue(e) {
        let port = e.target.value;
        // console.log('value', port)
        this.props.handleSetProt(port);
    }
    handleClickGetPortData() {
        if (typeof window.require == "undefined") {
            console.log("浏览器环境!!!");
            this.setState({
                portData: [{ comName: "浏览器展示用" }],
            });
            return;
        }
        // 这里写获得串口数据的逻辑
        // console.log("getPortData")
        const SerialPort = window.require("serialport");
        SerialPort.list((error, ports) => {
            console.log(ports);
            this.setState({
                portData: ports,
            });
        });
    }
    render() {
        // console.log("测试", this.props);
        const { className, onClick, burnActive } = this.props;
        return (
            <div className={classNames(styles.burnActive)}>
                <img
                    className={classNames(className, styles.burn, {
                        [styles.isActive]: burnActive,
                    })}
                    src={burnActive ? burnIcon2 : burnIcon1}
                    onClick={onClick}
                />
                <div className={classNames(styles.burnDivs)}>
                    <select
                        className={classNames(styles.burnSelects)}
                        onChange={this.handleSetSelestValue}
                        // 获得焦点是更新串口数据
                        onFocus={this.handleClickGetPortData}
                    >
                        <option value="def">选择串口</option>
                        {this.state.portData.map((item, index) => {
                            return (
                                <option key={index} value={item.comName}>
                                    {item.comName}
                                </option>
                            );
                        })}
                    </select>
                </div>
            </div>
        );
    }
}

BurnComponent.propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    burnActive: PropTypes.bool,
};

export default BurnComponent;
