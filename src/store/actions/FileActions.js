import { RX_X_FILE, RX_X_FILE_LOADING, RX_X_ARRANGEMENT, RX_X_ARRANGEMENT_RESET } from "../../config/reducer-actions";

export const rxRetrieveFile = (payload) => {
    return {
        type: RX_X_FILE,
        payload
    };
};

export const rxLoadFile = (payload) => {
    return {
        type: RX_X_FILE_LOADING,
        payload
    };
};

export const rxPushArrangement = (payload) => {
    return {
        type: RX_X_ARRANGEMENT,
        payload
    };
};

export const rxPushResetArrangement = () => {
    return {
        type: RX_X_ARRANGEMENT_RESET
    };
};