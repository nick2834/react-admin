export const addTags = (tags) => ({ type: "ADD_TAGS", payload: tags });

export const delTags = (path) => ({ type: "DEL_TAGS", payload: path })

export const addTagViews = (tags) => {
    return async(dispatch) => {
        dispatch(addTags(tags));
    };
};

export const delTagViews = (path) => {
    return async(dispatch) => {
        dispatch(delTags(path));
    };
};