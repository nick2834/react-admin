const { base } = require("../sql/dbConfig");
const tableName = "category";
// 列表
exports.list = (req, res) => {
    const { pageSize, pageNumber, data } = req.body;
    //   sort 筛选
    base(tableName)
        .where(data ? data : { pid: 0 }) //筛选一二级分类
        .page(Number(pageNumber), Number(pageSize))
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
            res.json({ status: 1, msg: "数据异常, 请重新尝试" });
        });
};

exports.lists = (req, res) => {
    base(tableName)
        .select()
        .then((list) => {
            res.json({
                status: "0",
                msg: "获取列表成功",
                data: list,
            });
        })
        .catch((error) => {
            console.log(error);
            res.json({ status: 1, msg: "数据异常, 请重新尝试" });
        });
};
exports.add = (req, res) => {
    const data = req.body;
    base(tableName)
        .thenAdd(data, { name: data.name }, true)
        .then((data) => {
            res.json({
                status: `${data.type == "add" ? "0" : "1"}`,
                msg: `${data.type == "add" ? "添加成功" : "该分类已存在"}`,
                result: data,
            });
        });
};
// 删除
exports.del = (req, res) => {
    const { id, pid } = req.body;
    /**
     * pid 为0 一级分类
     * pid 不为0 二级分类
     */
    base(tableName)
        .where({ id })
        .delete()
        .then(async(data) => {
            await base(tableName).where({ pid: id }).delete();
            res.json({
                status: data == 0 ? "1" : "0",
                msg: `${data == 0 ? "删除失败" : "删除成功"}`,
            });
        })
        .catch((error) => {
            res.json({ status: 1, msg: "删除数据异常, 请重新尝试" });
        });
};
// 修改
exports.update = (req, res, next) => {
    const { id, name, mainKey } = req.body;
    base(tableName)
        .where({ cid: id, name, mainKey })
        .update()
        .then((data) => {});
};
//查找某一条
exports.find = (req, res, next) => {
    base(tableName)
        .where({})
        .find()
        .then((data) => {});
};