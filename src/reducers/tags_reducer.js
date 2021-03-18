const list = [{ title: "首页", path: "/home" }];
const tagsReducer = (state = list, action) => {
    switch (action.type) {
        case "ADD_TAGS":
            return state.concat(action.payload);
        case "DEL_TAGS":
            let tagsFilter = state.filter(tages => tages.path !== action.payload)
            return tagsFilter;
        default:
            return state;
    }
};

export default tagsReducer;