const db = require("../sql/dbConfig");
const tableName = "category";
// 列表
exports.list = (req, res, next) => {
  db.base(tableName)
    .select()
    .then(data => {
      res.json({
        status: "0",
        msg: "无此结果",
        result: data
      });
      console.log(data);
    });
};
// 增加
// thenAdd(data, where, returnDetail)
// 当数据表中不存在where条件对应的数据时才进行插入
/*
    {
        type: 'exist' || 'add',  //exist表示已存在，add新增
        id: 1
    }
    */
exports.add = (req, res, next) => {
  const { name, mainKey } = req.body;
  db.base(tableName)
    .thenAdd({ name, mainKey }, { name }, true)
    .then(data => {
      res.json({
        status: `${data.type == "add" ? "0" : "1"}`,
        msg: `${data.type == "add" ? "添加成功" : "该分类已存在"}`,
        result: data
      });
    });
};
// 删除
exports.del = (req, res, next) => {
  const { id } = req.params;
  db.base(tableName)
    .where({ cid: id })
    .delete()
    .then(data => {
      // 1 删除成功
      // 0 删除失败 或 不存在该数据
      res.json({
        status: data == 0 ? "1" : "0",
        msg: `${data == 0 ? "删除失败" : "删除成功"}`
      });
    });
};
// 修改
exports.update = (req, res, next) => {
  const { id, name, mainKey } = req.body;
  db.base(tableName)
    .where({ cid:id, name, mainKey })
    .update()
    .then(data => {});
};
//查找某一条
exports.find = (req, res, next) => {
  db.base(tableName)
    .where({})
    .find()
    .then(data => {});
};
