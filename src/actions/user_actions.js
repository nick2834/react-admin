import { reqLogin } from "@/api";
import storageUtils from "@/utils/storageUtils";
/*
接收用户的同步action
 */
export const receiveUser = (user) => ({ type: "SET_USER", user });

/*
显示错误信息同步action
 */
export const showErrorMsg = (errorMsg) => ({
    type: "SHOW_ERROR_MSG",
    errorMsg,
});

export const login = (username, password) => {
    return async(dispatch) => {
        const result = await reqLogin(username, password);

        if (result.status === 0) {
            const user = result.data;
            // 保存local中
            storageUtils.saveUser(user);
            // 分发接收用户的同步action
            dispatch(receiveUser(user));
        } else {
            // 2.2. 如果失败, 分发失败的同步action
            const msg = result.msg;
            console.log(msg)
                // message.error(msg)
            dispatch(showErrorMsg(msg));
        }
    };
};

/*
退出登陆的同步action
 */
export const logout = () => {
    // 删除local中的user
    storageUtils.removeUser();
    // 返回action对象
    return { type: "RESET_USER" };
};