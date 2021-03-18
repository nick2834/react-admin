export const addTagViews = (tags) => ({ type: "ADD_TAGS", tags });

export const addtags = (tags) => {
    return async(dispatch) => {
        dispatch(addTagViews(tags))
    };
};