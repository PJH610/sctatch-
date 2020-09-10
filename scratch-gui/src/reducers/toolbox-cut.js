// const TOOLBOX_CUT = 'scratch-gui/toolbox/TOOLBOX_def';

const initialState = {
    toolboxCutXML: false,
};

const reducer = function (state, action) {
    if (typeof state === "undefined") state = initialState;
    switch (action.type) {
        case "TOOLBOX_CUT":
            // console.log(action);
            return Object.assign({}, state, {
                toolboxCutXML: action.data,
            });
        default:
            return state;
    }
};

const setToolboxCut = (data) => ({ type: "TOOLBOX_CUT", data });

export {
    reducer as default,
    initialState as toolboxCutInitialState,
    setToolboxCut,
};
