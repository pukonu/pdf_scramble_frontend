import { RX_X_FILE, RX_X_FILE_LOADING, RX_X_ARRANGEMENT, RX_X_ARRANGEMENT_RESET } from "../../config/reducer-actions";

const INITIAL_STATE = {
    fileResponse: {},
    isFileError: null,
    isFileLoading: null,
    arrangement: [],
};

export default (state=INITIAL_STATE, actions) => {
    if (actions) {
        const ret = {...state};

        switch (actions.type) {
            case RX_X_FILE:
                return ret;

            case RX_X_FILE_LOADING:
                const { isFileLoading, isFileError, fileResponse } = actions.payload;
                ret["isFileLoading"] = isFileLoading;
                ret["isFileError"] = isFileError;
                ret["fileResponse"] = fileResponse;
                return ret;

            case RX_X_ARRANGEMENT:
                ret["arrangement"] = actions.payload.groupChildren.map(v => v.map(t => parseInt(t.id)));
                return ret;

            case RX_X_ARRANGEMENT_RESET:
                ret["arrangement"] = [];
                return ret;

            default:
                return state;
        }
    }

    return state;
}
