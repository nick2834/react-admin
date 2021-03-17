import { combineReducers } from "redux";
import counterReducer from "./counter_reducer";

//合并所有reducer
const rootReducers = combineReducers({
    counter: counterReducer,
});

export default rootReducers;