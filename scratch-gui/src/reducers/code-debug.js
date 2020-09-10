const initialState = {
    codeDebugData: ["环境准备正常 ! ! !"],
    scrollBar: true,
};

const reducer = function (state, action) {
    if (typeof state === "undefined") state = initialState;
    switch (action.type) {
        case "CODE_DEBUG":
            // console.log(action.data);
            return Object.assign({}, state, {
                codeDebugData: action.data,
            });
        case "SCROLL_BAR":
            return Object.assign({}, state, {
                codeDebugData: action.data,
            });
        default:
            return state;
    }
};

const setCodeDebug = (data) => ({ type: "CODE_DEBUG", data });
const setScrollBar = (data) => ({ type: "SCROLL_BAR", data });

export {
    reducer as default,
    initialState as codeDebugInitialState,
    setCodeDebug,
    setScrollBar,
};
