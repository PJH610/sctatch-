import PropTypes from 'prop-types';
import bindAll from 'lodash.bindall';
import React from 'react';
import { connect } from 'react-redux';
import CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/python/python';
import 'codemirror/mode/clike/clike';
import 'codemirror/addon/fold/foldcode';
import 'codemirror/addon/fold/brace-fold';
import 'codemirror/addon/fold/indent-fold';
import 'codemirror/addon/fold/foldgutter';
import 'codemirror/addon/fold/foldgutter.css';
import 'codemirror/theme/tomorrow-night-bright.css';
import CodeEditorComponent from '../components/code-editor/code-editor.jsx';
import { setCode, setReadOnly } from '../reducers/code-tab';

class CodeEditor extends React.Component {
    constructor(props) {
        super(props);
        // const data1 = 'hello world';
        // console.log('props', props.setCode(data1));
        bindAll(this, ['handleToggleLock', 'setRef', 'onChange']);
        this.mode = { arduino: 'text/x-csrc', python: 'python' };
    }

    componentDidMount() {
        this.cm = CodeMirror.fromTextArea(this.textarea, {
            mode: this.mode[this.props.language],
            lineNumbers: true,
            dragDrop: false,
            readOnly: this.props.readOnly,
            foldGutter: true,
            // theme: 'tomorrow-night-bright',
            gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter']
        });
        this.cm.on('change', this.onChange);
        this.doc = this.cm.getDoc();
        this.doc.setValue(this.props.code);
    }

    componentDidUpdate(prevProps) {
        if (this.props.language !== prevProps.language) {
            this.cm.setOption('mode', this.mode[this.props.language]);
        }
        if (this.props.readOnly !== prevProps.readOnly) {
            this.cm.setOption('readOnly', this.props.readOnly);
        }
        if (this.props.readOnly && this.props.code !== prevProps.code) {
            this.doc.setValue(this.props.code);
        }
    }

    handleToggleLock() {
        this.props.setReadOnly(!this.props.readOnly);
    }

    setRef(ele) {
        // console.log('ele:', ele);
        this.textarea = ele;
    }

    onChange() {
        // console.log('code----->', this.props.code);
        if (!this.props.readOnly) {
            this.props.setCode(this.doc.getValue());
        }
    }

    render() {
        const {
            /* eslint-disable no-unused-vars */
            code,
            language,
            setCode: a,
            setReadOnly: b,
            /* eslint-disable no-unused-vars */
            ...props
        } = this.props;
        return (
            <CodeEditorComponent
                onToggleLock={this.handleToggleLock}
                {...props}
            >
                <textarea ref={this.setRef} />
            </CodeEditorComponent>
        );
    }
}

CodeEditor.propTypes = {
    code: PropTypes.string.isRequired,
    language: PropTypes.string.isRequired,
    readOnly: PropTypes.bool.isRequired,
    setCode: PropTypes.func.isRequired,
    setReadOnly: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    code: state.scratchGui.codeTab.code,
    language: state.scratchGui.codeTab.language,
    readOnly: state.scratchGui.codeTab.readOnly
});

const mapDispatchToProps = dispatch => ({
    setCode: data => dispatch(setCode(data)),
    setReadOnly: data => dispatch(setReadOnly(data))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CodeEditor);
