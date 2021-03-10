const { base } = require("../sql/dbConfig");
const tableName = "category";
// 列表
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
            res.json({ status: 1, msg: "数据异常, 请重新尝试" });
        });
};
exports.add = (req, res) => {
    const { name, mainKey } = req.body;
    base(tableName)
        .thenAdd({ name, mainKey }, { name }, true)
        .then((data) => {
            res.json({
                status: `${data.type == "add" ? "0" : "1"}`,
                msg: `${data.type == "add" ? "添加成功" : "该分类已存在"}`,
                result: data,
            });
        });
};
// 删除
exports.del = (req, res, next) => {
    const { id } = req.params;
    base(tableName)
        .where({ cid: id })
        .delete()
        .then((data) => {
            // 1 删除成功
            // 0 删除失败 或 不存在该数据
            res.json({
                status: data == 0 ? "1" : "0",
                msg: `${data == 0 ? "删除失败" : "删除成功"}`,
            });
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