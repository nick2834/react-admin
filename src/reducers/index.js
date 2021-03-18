import { combineReducers } from "redux";
import counterReducer from "./counter_reducer";
import userReducer from "./user_reducer";
import tagsReducer from "./tags_reducer";

//合并所有reducer
const rootReducers = combineReducers({
    counter: counterReducer,
    users: userReducer,
    tagsViews: tagsReducer,
});

export default rootReducers;