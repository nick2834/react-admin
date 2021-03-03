import http from "@/utils/http";

export const reqLogin = (username, password) =>
    http.post("/api/users/login", { username, password });

//权限列表
export const roleList = (data) => http.post("/api/role/list", data);