import bindAll from "lodash.bindall";
import PropTypes from "prop-types";
import React from "react";
import VM from "scratch-vm";
import { connect } from "react-redux";

// new
import { setCodeDebug } from "../reducers/code-debug";
import BurnComponent from "../components/burn/burn.jsx";
import ControlsComponent from "../components/controls/controls.jsx";

class Controls extends React.Component {
    constructor(props) {
        super(props);
        bindAll(this, [
            "handleGreenFlagClick",
            "handleStopAllClick",
            "handleClickBurn",
            "handleSetProt",
        ]);
        // new
        this.state = {
            // new 上传图标状态
            burnActive: false,
            port: "",
            flat: false,
        };
    }

    handleGreenFlagClick(e) {
        e.preventDefault();
        if (e.shiftKey) {
            this.props.vm.setTurboMode(!this.props.turbo);
        } else {
            if (!this.props.isStarted) {
                this.props.vm.start();
            }
            this.props.vm.greenFlag();
        }
    }
    handleStopAllClick(e) {
        e.preventDefault();
        this.props.vm.stopAll();
    }

    // 拿到子组件的串口数据
    handleSetProt(port) {
        // console.log("拿到串口数据啦", port)
        this.setState({
            port,
        });
    }
    // 烧录固件的方法
    handleClickBurn() {
        let { port } = this.state;
        let { code } = this.props;
        if (this.state.flat) {
            console.log("节流!!");
            return;
        }
        if (port == "" || port == "def") {
            alert("没有选串口!!!");
            return;
        }
        this.setState({
            // 上传图标状态
            burnActive: !this.state.burnActive,
            flat: true,
        });
        // 复原状态
        this.props.setCodeDebug(["start !!!", "开始编译 ..."]);

        const { spawn } = window.require("child_process"); //开一个子进程
        const path = window.require("path");
        const { remote } = window.require("electron");
        const base_path = path.dirname(remote.app.getPath("exe"));

        // 需要到arduino_debug.exe的路径，我们使用arduino_debug进行编译，这里需要改写成你的
        let arduinoPath = base_path + "/link_le/arduino/arduino_debug";
        // let arduinoPath = "C:/arduino/arduino_debug";

        // 被编译下载的ino文件的路径，这里需要改写成你的
        let filePath = base_path + "/link_le/letopo/letopo.ino";
        // let filePath = "C:/letopo/letopo.ino";

        // 这里需要将你的获取到的arduino代码写到之前要被编译的ino文件中
        const fs = window.require("fs"); //文件
        fs.writeFile(filePath, code, function (err) {
            if (err) {
                alert("代码写入错误 !!!");
                return console.error("代码写入错误:", err);
            }
        });

        const spawnObj = spawn(arduinoPath, [
            "--board",
            "arduino:avr:uno", // 主控板选型 这里使用uno
            "--pref",
            "build.path=zrobot-builder", // 指定一下构建目录，可以提升arduino的编译速度，几秒就完事，速度取决于电脑的配置
            "--upload", // 编译+下载
            "--port", // 指定串口,这里需要到串口，所以需要用到node.serialPort模块
            port, // 串口号
            filePath,
        ]);

        const iconv = window.require("iconv-lite");
        spawnObj.stderr.on("data", (data) => {
            // 编译器返回来的错误数据,data
            let gbkData = iconv.decode(data, "gbk");
            let debug = this.props.codeDebugData.slice();
            debug.push(gbkData);
            this.props.setCodeDebug(debug);
        });
        spawnObj.stdout.on("data", (data) => {
            // 编译器返回来输出的数据,data
            let gbkData = iconv.decode(data, "gbk");
            let debug = this.props.codeDebugData.slice();
            debug.push(gbkData);
            this.props.setCodeDebug(debug);
        });
        spawnObj.on("close", function (data) {
            let gbkData = iconv.decode(data, "gbk");
            let debug = this.props.codeDebugData.slice();
            debug.push(gbkData);
            this.props.setCodeDebug(debug);
            console.log("进程关闭");
        });
        spawnObj.on("exit", (code) => {
            let debug = this.props.codeDebugData.slice();
            console.log("exit code : " + "" + code);
            if (code == 0) {
                //进程退出，也就意味着编译完成，你可以在这里写一些提示之类的东西
                this.setState({
                    // 上传图标状态
                    burnActive: false,
                    flat: false,
                });
                debug.push("上传成功 !!!");
                this.props.setCodeDebug(debug);
                // alert("上传成功 !!");
            } else {
                //这里说明你的编译过程中存在问题，从而导致子进程退出，
                //错误信息在spawnObj.stderr.on()里
                this.setState({
                    // 上传图标状态
                    burnActive: false,
                    flat: false,
                });
                debug.push("上传失败 !!!");
                this.props.setCodeDebug(debug);
                // alert("上传失败,请检查代码或者环境!!!");
            }
        });
    }

    render() {
        const {
            vm, // eslint-disable-line no-unused-vars
            isStarted, // eslint-disable-line no-unused-vars
            projectRunning,
            // new
            toolboxCutXML,
            setCodeDebug,
            codeDebugData,
            turbo,
            ...props
        } = this.props;
        return toolboxCutXML ? (
            <BurnComponent
                onClick={this.handleClickBurn}
                burnActive={this.state.burnActive}
                handleSetProt={this.handleSetProt}
            />
        ) : (
            <ControlsComponent
                {...props}
                active={projectRunning}
                turbo={turbo}
                onGreenFlagClick={this.handleGreenFlagClick}
                onStopAllClick={this.handleStopAllClick}
            />
        );
    }
}

Controls.propTypes = {
    isStarted: PropTypes.bool.isRequired,
    projectRunning: PropTypes.bool.isRequired,
    turbo: PropTypes.bool.isRequired,
    vm: PropTypes.instanceOf(VM),
    // new
    toolboxCutXML: PropTypes.bool,
    code: PropTypes.string.isRequired,
    setCodeDebug: PropTypes.func,
    codeDebugData: PropTypes.array,
};

const mapStateToProps = (state) => ({
    isStarted: state.scratchGui.vmStatus.running,
    projectRunning: state.scratchGui.vmStatus.running,
    turbo: state.scratchGui.vmStatus.turbo,
    // new
    toolboxCutXML: state.scratchGui.toolboxCut.toolboxCutXML,
    code: state.scratchGui.codeTab.code,
    codeDebugData: state.scratchGui.codeDebug.codeDebugData,
});

// no-op function to prevent dispatch prop being passed to component
const mapDispatchToProps = (dispatch) => ({
    // setCode: data => dispatch(setCode(data)),
    setCodeDebug: (data) => dispatch(setCodeDebug(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Controls);
