import PropTypes from 'prop-types';
import React from 'react';
import bindAll from 'lodash.bindall';
import { connect } from 'react-redux';
import VM from 'scratch-vm';
import { STAGE_DISPLAY_SIZES } from '../lib/layout-constants';
// import {setUploading} from '../reducers/code-tab';

import CodeWrapperComponent from '../components/code-wrapper/code-wrapper.jsx';

class CodeWrapper extends React.Component {
    constructor(props) {
        super(props);
        bindAll(this, []);
    }

    componentDidMount() {
        // console.log('1111111', this.props);
    }

    render() {
        return <CodeWrapperComponent {...this.props} />;
    }
}

CodeWrapper.propTypes = {
    stageSize: PropTypes.oneOf(Object.keys(STAGE_DISPLAY_SIZES)).isRequired,
    vm: PropTypes.instanceOf(VM).isRequired
};

const mapStateToProps = state => ({
    isFullScreen: state.scratchGui.mode.isFullScreen
});

const mapDispatchToProps = dispatch => ({
    // setUploading: data => dispatch(setUploading(data))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CodeWrapper);
