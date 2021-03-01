const { base } = require("../sql/dbConfig");
const md5 = require("blueimp-md5");
exports.login = (req, res) => {
    const { username, password } = req.body;
    base("sys_user")
        .where({ username, password: md5(password) })
        .find()
        .then((user) => {
            //登录成功
            if (JSON.stringify(user) !== "{}") {
                // 生成一个cookie(userid: user._id), 并交给浏览器保存
                res.cookie("userid", user._id, { maxAge: 1000 * 60 * 60 * 24 });
                if (user.role_id) {
                    base("roles")
                        .where({ id: user.role_id })
                        .find()
                        .then((role) => {
                            user.role = role;
                            console.log("role user", user);
                            res.send({ status: 0, data: user });
                        });
                } else {
                    user.role = { menus: [] };
                    // 返回登陆成功信息(包含user)
                    res.json({ status: 0, data: user });
                }
            } else {
                res.json({ status: 1, msg: "用户名或密码不正确!" });
            }
        })
        .catch((error) => {
            console.error("登陆异常", error);
            res.json({ status: 1, msg: "登陆异常, 请重新尝试" });
        });
};

exports.register = (req, res) => {
    const { username, password } = req.body;
    base("sys_user")
        .where({ username })
        .find()
        .then((user) => {
            if (JSON.stringify(user) === "{}") {
                return base("sys_user").add({ username, password: md5(password) });
            } else {
                res.json({ status: 1, msg: "此用户已存在" });
                return new Promise(() => {});
            }
        })
        .then((user) => {
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
    base("sys_user")
        .where({ id: user.id })
        .update(user)
        .then((oldUser) => {
            const data = Object.assign(oldUser, user)
            res.json({ status: 0, data })
        }).catch(error => {
            console.error('更新用户异常', error)
            res.json({ status: 1, msg: '更新用户异常, 请重新尝试' })
        })
};