const { base } = require("../sql/dbConfig");
const md5 = require("blueimp-md5");
const moment = require("moment");
const tableName = "sys_user";
exports.login = (req, res) => {
    const { username, password } = req.body;
    base(tableName)
        .where({ username, password: md5(password) })
        .find()
        .then((user) => {
            //登录成功
            if (JSON.stringify(user) !== "{}") {
                // 生成一个cookie(userid: user._id), 并交给浏览器保存
                res.cookie("userid", user.user_id, { maxAge: 1000 * 60 * 60 * 24 });
                if (user.role_id) {
                    // base('sys_user_role').join({table:""})
                    res.send({ status: 0, data: user });
                } else {
                    delete user.password;
                    // 返回登陆成功信息(包含user)
                    res.json({ status: 0, data: user });
                }
            } else {
                res.json({ status: 1, msg: "该用户不存在" });
            }
        })
        .catch((error) => {
            console.error("登陆异常", error);
            res.json({ status: 1, msg: "登陆异常, 请重新尝试" });
        });
};

exports.register = (req, res) => {
    const {
        username,
        password,
        email,
        mobile,
        create_user_id,
        status,
        role,
    } = req.body;
    base(tableName)
        .where({ username })
        .find()
        .then((user) => {
            if (JSON.stringify(user) === "{}") {
                return base(tableName).add({
                    username,
                    password: password ? md5(password) : md5(123456),
                    email,
                    mobile,
                    status: status ? status : 4, //状态 0：禁用 1：待审核 2：审核不通过 3：审核通过 4：正常
                    create_user_id: create_user_id ? create_user_id : null,
                    // create_time: moment().format("YYYY-MM-DD HH:mm:ss")
                });
            } else {
                res.json({ status: 1, msg: "此用户已存在" });
                return new Promise(() => {});
            }
        })
        .then((user) => {
            console.log(tableName, user);
            base("sys_user_role")
                .add({
                    user_id: user,
                    role_id: role,
                })
                .then((res) => {
                    console.log("sys_user_role", res);
                });
            // 返回包含user的json数据
            res.json({ status: 0, data: user });
        })
        .catch((error) => {
            console.error("注册异常", error);
            res.json({ status: 1, msg: "添加用户异常, 请重新尝试" });
        });
};

exports.update = (req, res) => {
    const user = req.body;
    base(tableName)
        .where({ user_id: user.user_id })
        .update(user)
        .then((oldUser) => {
            const data = Object.assign(oldUser, user);
            res.json({ status: 0, data });
        })
        .catch((error) => {
            console.error("更新用户异常", error);
            res.json({ status: 1, msg: "更新用户异常, 请重新尝试" });
        });
};

exports.list = (req, res) => {
    const { pageSize, pageNumber, data } = req.body;
    base(tableName)
        .page(Number(pageNumber), Number(pageSize))
        .where(data)
        // .field([
        //     "user_id",
        //     "username",
        //     "status",
        //     "email",
        //     "mobile",
        //     "create_user_id",
        //     "create_time",
        // ])
        // .select()
        .countSelect()
        .then((list) => {
            res.json({
                status: "0",
                msg: "获取列表成功",
                data: list,
            });
        })
        .catch((error) => {
            console.log(error);
            res.json({ status: 1, msg: "登陆异常, 请重新尝试" });
        });
};