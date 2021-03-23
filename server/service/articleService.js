const db = require("../sql/dbConfig");
const tableName = "article";
const moment = require("moment");
// list
exports.list = (req, res, next) => {
    const { pageSize, pageIndex, data } = req.body;
    db.base(tableName)
        .page(Number(pageIndex), Number(pageSize))
        .where(data)
        // .where({ category_id: 3 })
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
// 增加
exports.add = (req, res, next) => {
    const articleData = req.body;
    db.base(tableName)
        .add(articleData)
        .then((data) => {
            res.json({ status: 0, data });
        })
        .catch((error) => {
            console.error("更新异常", error);
            res.json({ status: 1, msg: "更新权限异常, 请重新尝试" });
        });
};
// 删除
exports.del = (req, res, next) => {
    const { id } = req.body;
    db.base(tableName)
        .where({ id })
        .delete()
        .then((data) => {
            res.json({
                status: data == 0 ? "1" : "0",
                msg: `${data == 0 ? "删除失败" : "删除成功"}`,
            });
        });
};
// 修改
// 查询
exports.getByid = (req, res, next) => {
    const { id, category_id } = req.body;
    if (category_id) {
        db.base(tableName)
            .join(`category on article.category_id = category.cid`)
            .select()
            .then((data) => {
                if (data.length > 0) {
                    let result = data.filter((item) => item.id == id);
                    res.json({
                        status: "0",
                        result: result[0],
                    });
                } else {
                    res.json({
                        status: "1",
                        result: null,
                    });
                }
            });
    } else {
        db.base(tableName)
            .where({ id })
            .select()
            .then((data) => {
                if (data.length > 0) {
                    res.json({
                        status: "0",
                        result: data[0],
                    });
                } else {
                    res.json({
                        status: "1",
                        result: null,
                    });
                }
            });
    }
};