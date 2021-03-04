import http from "@/utils/http";
//登录
export const reqLogin = (username, password) =>
    http.post("/api/users/login", { username, password });
//用户列表
export const userList = (data) => http.post("/api/users/list", data);
//增加用户
export const addUser = (data) => http.post("/api/users/register", data);
//删除用户
export const delUser = (user_id) => http.post(`/api/users/delete/${user_id}`);
//删除用户
export const updateUser = (data) => http.post(`/api/users/update`, data);

//权限列表
export const roleList = (data) => http.post("/api/role/list", data);
//增加权限
export const addRole = (data) => http.post("/api/role/add", data);
//更新权限
export const updateRole = (data) => http.post("/api/role/update", data);
//删除权限
export const delRole = (role_id) => http.post(`/api/role/delete/${role_id}`);