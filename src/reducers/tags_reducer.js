import { sStorage } from "@/utils/tools";

const tagsViews = sStorage._store.tagsViews
const SESSION_TYPE = "tagsViews";

const list = [{ title: "首页", path: "/home" }];

const tagsReducer = (
    state = tagsViews ? JSON.parse(tagsViews) : list,
    action
) => {
    switch (action.type) {
        case "ADD_TAGS":
            let result = state.concat(action.payload);
            sStorage._store.setItem(SESSION_TYPE, JSON.stringify(result));
            return result;
        case "DEL_TAGS":
            let tagsFilter = state.filter((tages) => tages.path !== action.payload);
            sStorage._store.setItem(SESSION_TYPE, JSON.stringify(tagsFilter));
            return tagsFilter;
        default:
            return state;
    }
};

export default tagsReducer;