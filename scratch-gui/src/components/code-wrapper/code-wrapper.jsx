import PropTypes from "prop-types";
import React from "react";
import VM from "scratch-vm";
import Box from "../box/box.jsx";
import StageHeader from "../../containers/stage-header.jsx";
import CodeEditor from "../../containers/code-editor.jsx";

import CodeDebugComponent from "../code-debug/code-debug.jsx";

import { STAGE_DISPLAY_SIZES } from "../../lib/layout-constants";

import styles from "./code-wrapper.css";

const CodeWrapperComponent = ({ isFullScreen, stageSize, vm }) => (
    <Box className={styles.codeWrapper}>
        <Box className={styles.codeMenuWrapper}>
            <StageHeader stageSize={stageSize} vm={vm} />
        </Box>
        <Box className={styles.codeEditorWrapper}>
            <CodeEditor isFullScreen={isFullScreen} stageSize={stageSize} />
        </Box>
        <Box className={styles.codeCompile}>
            {/* 编译产生的信息组件 */}
            <CodeDebugComponent />
        </Box>
    </Box>
);

CodeWrapperComponent.propTypes = {
    isFullScreen: PropTypes.bool.isRequired,
    stageSize: PropTypes.oneOf(Object.keys(STAGE_DISPLAY_SIZES)).isRequired,
    vm: PropTypes.instanceOf(VM).isRequired,
};

export default CodeWrapperComponent;
