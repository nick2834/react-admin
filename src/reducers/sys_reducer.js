const base_sys_config = {
    primaryColor: "#108ee9",
    tabMenus: [],
};

const sysReducer = (state = base_sys_config, action) => {
    switch (action.type) {
        case "":
            return {...state, primaryColor: action.payload };
        case "":
            return;
        case "":
            return;
        default:
            return state;
    }
};

export default sysReducer;