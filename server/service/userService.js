const { base } = require("../sql/dbConfig");
const md5 = require("blueimp-md5");
const tableName = "sys_user";
exports.login = (req, res) => {
    const { username, password } = req.body;
    // SELECT u.user_id,u.username,u.`status`,r.menus from sys_user_role ur LEFT JOIN sys_user u ON u.user_id = ur.user_id LEFT JOIN sys_role r ON ur.role_id = r.role_id WHERE u.user_id = "125794949"
    base(tableName)
        .where({ username, password: md5(password) })
        .find()
        .then((user) => {
            //登录成功
            if (JSON.stringify(user) !== "{}") {
                // 生成一个cookie(userid: user._id), 并交给浏览器保存
                res.cookie("userid", user.user_id, { maxAge: 1000 * 60 * 60 * 24 });
                //sys_role  role_id menus
                //sys_user_role user_id role_id
                //sys_user user_id
                if (user.username === "admin") {
                    delete user.password;
                    user.menus = `["/home","/article","/category","/articles","/user","/role"]`;
                    res.send({ status: 0, data: user });
                    return new Promise(() => {});
                } else {
                    return base(
                        `SELECT u.user_id,u.username,u.status,r.menus,u.email,u.mobile,u.create_user_id from sys_user_role ur 
                LEFT JOIN sys_user u ON u.user_id = ur.user_id 
                LEFT JOIN sys_role r ON ur.role_id = r.role_id 
                WHERE u.user_id = ${user.user_id}`,
                        false
                    );
                    // 返回登陆成功信息(包含user)
                }
            } else {
                res.json({ status: 1, msg: "该用户不存在" });
                return new Promise(() => {});
            }
        })
        .then((user) => {
            if (user.length > 0) {
                res.json({ status: 0, data: user[0] });
            } else {
                res.json({ status: 1, msg: "该用户不存在" });
            }
        })
        .catch((error) => {
            console.error("登陆异常", error);
            res.json({ status: 1, msg: "登陆异常, 请重新尝试" });
        });
};

exports.add = (req, res) => {
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
        .then(async(user) => {
            await base("sys_user_role").add({
                user_id: user,
                role_id: role,
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
//删除
exports.delete = (req, res) => {
    const { user_id } = req.params;
    base(tableName)
        .where({ user_id })
        .delete()
        .then(async(response) => {
            await base("sys_user_role").where({ user_id }).delete();
            res.json({ status: 0, data: response });
        })
        .catch((error) => {
            console.error("删除异常", error);
            res.json({ status: 1, msg: "删除用户异常, 请重新尝试" });
        });
};