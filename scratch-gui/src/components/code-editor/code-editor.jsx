import PropTypes from 'prop-types';
import classNames from 'classnames';
import React from 'react';
import {defineMessages, injectIntl, intlShape} from 'react-intl';
import Box from '../box/box.jsx';
import ActionMenu from '../action-menu/action-menu.jsx';
import {STAGE_DISPLAY_SIZES} from '../../lib/layout-constants.js';
import {getStageDimensions} from '../../lib/screen-utils.js';

import styles from './code-editor.css';
import lockIcon from './icon--lock.svg';
import lockOpenIcon from './icon--lock-open.svg';

const messages = defineMessages({
    lock: {
        id: 'gui.codeEditor.lock',
        description: '',
        defaultMessage: '已锁定'
    },
    unlock: {
        id: 'gui.codeEditor.unlock',
        description: '',
        defaultMessage: '未锁定'
    }
});

const CodeEditorComponent = props => {
    const {children, intl, isFullScreen, onToggleLock, readOnly, stageSize} = props;
    const stageDimensions = getStageDimensions(stageSize, isFullScreen);

    return (
        <Box
            className={classNames({[styles.wrapperOverlay]: isFullScreen})}
            style={{
                width: isFullScreen ? 'auto' : stageDimensions.width,
                height: isFullScreen ? 'auto' : '100%'
            }}
        >
            {children}
            <ActionMenu
                className={styles.button}
                img={readOnly ? lockIcon : lockOpenIcon}
                title={intl.formatMessage(messages[readOnly ? 'lock' : 'unlock'])}
                onClick={onToggleLock}
            />
        </Box>
    );
};

CodeEditorComponent.propTypes = {
    children: PropTypes.node.isRequired,
    intl: intlShape.isRequired,
    isFullScreen: PropTypes.bool.isRequired,
    onToggleLock: PropTypes.func.isRequired,
    readOnly: PropTypes.bool.isRequired,
    stageSize: PropTypes.oneOf(Object.keys(STAGE_DISPLAY_SIZES)).isRequired
};

export default injectIntl(CodeEditorComponent);
