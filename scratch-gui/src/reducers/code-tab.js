const CODE = 'scratch-gui/code-tab/CODE';
const LANGUAGE = 'scratch-gui/code-tab/LANGUAGE';
const READ_ONLY = 'scratch-gui/code-tab/READ_ONLY';
const UPLOADING = 'scratch-gui/code-tab/UPLOADING';

const initialState = {
    code: '',
    language: 'arduino',
    readOnly: true,
    uploading: false
};

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
        case CODE:
            return Object.assign({}, state, {
                code: action.data
            });
        case LANGUAGE:
            return Object.assign({}, state, {
                language: action.data
            });
        case READ_ONLY:
            return Object.assign({}, state, {
                readOnly: action.data
            });
        case UPLOADING:
            return Object.assign({}, state, {
                uploading: action.data
            });
        default:
            return state;
    }
};

const setCode = data => ({ type: CODE, data });
const setLanguage = data => ({ type: LANGUAGE, data });
const setReadOnly = data => ({ type: READ_ONLY, data });
const setUploading = data => ({ type: UPLOADING, data });

export { reducer as default, initialState as codeTabInitialState, setCode, setLanguage, setReadOnly, setUploading };
