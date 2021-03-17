import { message } from "antd";
import storageUtils from "@/utils/storageUtils";

/*
用来管理当前登陆用户的reducer函数
 */
const initUser = storageUtils.getUser();

const userReducer = (state = initUser, action) => {
    switch (action.type) {
        case "SET_USER":
            message.success("登录成功")
            return action.user;
        case "SHOW_ERROR_MSG":
            const errorMsg = action.errorMsg;
            message.error(errorMsg)
            return {...state, errorMsg };
        case "RESET_USER":
            return {};
        default:
            return state;
    }
};

export default userReducer;