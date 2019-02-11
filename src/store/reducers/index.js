import {combineReducers} from "redux";
import FileReducer from "./FileReducer";

export default combineReducers ({
    fileReducer: FileReducer,
});
