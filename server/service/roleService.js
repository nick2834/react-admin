const { base } = require("../sql/dbConfig");
const moment = require("moment");
const { response } = require("express");
const tableName = "sys_role";
//权限列表
exports.list = (req, res) => {
    const { pageSize, pageNumber, data } = req.body;
    console.log("req.body", req.body);
    base(tableName)
        .page(Number(pageNumber), Number(pageSize))
        .where(data)
        .countSelect()
        .then((list) => {
            res.json({
                status: "0",
                msg: "获取列表成功",
                data: list,
            });
        })
        .catch((error) => {
            res.json({ status: 1, msg: "登陆异常, 请重新尝试" });
        });
};

exports.add = (req, res) => {
    const { role_name, remark, create_user_id, create_user_name } = req.body;
    base(tableName)
        .where({ role_name })
        .find()
        .then((roles) => {
            console.log("roles", roles);
            if (JSON.stringify(roles) === "{}") {
                return base(tableName).add({
                    role_name,
                    remark: remark ? remark : null,
                    create_user_id: create_user_id ? create_user_id : null,
                    create_user_name: create_user_name ? create_user_name : null,
                    create_time: moment().format("YYYY-MM-DD HH:mm:ss"),
                    menus: '["/home"]',
                });
            } else {
                res.json({ status: 1, msg: "此权限已存在" });
                return new Promise(() => {});
            }
        })
        .then((roles) => {
            // 返回包含user的json数据
            res.json({ status: 0, data: roles });
        })
        .catch((error) => {
            console.log(error);
            res.json({ status: 1, msg: "添加权限异常, 请重新尝试" });
        });
};

exports.delete = (req, res) => {
    const { role_id } = req.params;
    base(tableName)
        .where({ role_id })
        .delete()
        .then((response) => {
            res.json({ status: 0, data: response });
        })
        .catch((error) => {
            console.error("删除异常", error);
            res.json({ status: 1, msg: "删除权限异常, 请重新尝试" });
        });
};

exports.update = (req, res) => {
    const roles = req.body;
    roles.create_time = moment(roles.create_time).format("YYYY-MM-DD HH:mm:ss");
    base(tableName)
        .where({ role_id: roles.role_id })
        .update(roles)
        .then((oldRole) => {
            const data = Object.assign(oldRole, roles);
            res.json({ status: 0, data });
        })
        .catch((error) => {
            console.error("更新异常", error);
            res.json({ status: 1, msg: "更新权限异常, 请重新尝试" });
        });
};