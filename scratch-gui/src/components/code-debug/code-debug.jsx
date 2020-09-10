import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import Box from "../box/box.jsx";
import { setCodeDebug, setScrollBar } from "../../reducers/code-debug";
import styles from "./code-debug.css";
import { injectIntl } from "react-intl";

class CodeDebugComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.scrollToBottom = this.scrollToBottom.bind(this);
    }

    componentDidMount() {
        // this.scrollToBottom();
        // let interval1 = setInterval(() => {
        //     this.refs.main.scrollTop = 10000;
        //     let debug = this.props.codeDebugData.slice();
        //     debug.push("编译中....");
        //     this.props.setCodeDebug(debug);
        // }, 200);
        // if (this.messagesEnd) {
        //     this.state.setTime = setInterval(() => {
        //         this.messagesEnd.scrollTop = 10000;
        //     }, 100);
        //     setTimeout(() => {
        //         clearInterval(interval1);
        //         this.messagesEnd.scrollTop = 10000;
        //     }, 100000);
        // }
    }
    componentDidUpdate() {
        this.messagesEnd.scrollTop = 10000;
    }

    scrollToBottom() {
        // console.log("debug", this.props.codeDebugData)
        let debug = this.props.codeDebugData.slice();
        debug.push("编译中....");
        // // console.log(debug)
        this.props.setCodeDebug(debug);
    }

    render() {
        const { codeDebugData } = this.props;
        // console.log(this.props.codeDebugData);
        return (
            <div
                className={classNames(styles.codeDebug)}
                ref={(el) => {
                    this.messagesEnd = el;
                }}
            >
                {/* <CodeDebugsComponent codeDebugData={codeDebugData} /> */}
                {codeDebugData.map((item, index) => {
                    return (
                        <div className={styles.codeDebugBox} key={index}>
                            {item}
                        </div>
                    );
                })}
                <Box
                    onClick={this.scrollToBottom}
                    // className={styles.codeDebugPlaceholder}
                ></Box>
            </div>
        );
    }
}

CodeDebugComponent.propTypes = {
    // className: PropTypes.string,
    codeDebugData: PropTypes.array,
    setCodeDebug: PropTypes.func,
    scrollBar: PropTypes.bool,
    setScrollBar: PropTypes.func,
};

const mapStateToProps = (state) => ({
    codeDebugData: state.scratchGui.codeDebug.codeDebugData,
    scrollBar: state.scratchGui.codeDebug.scrollBar,
});

const mapDispatchToProps = (dispatch) => ({
    // setCode: data => dispatch(setCode(data)),
    setCodeDebug: (data) => dispatch(setCodeDebug(data)),
    setScrollBar: (data) => dispatch(setScrollBar(data)),
});

export default injectIntl(
    connect(mapStateToProps, mapDispatchToProps)(CodeDebugComponent)
);
