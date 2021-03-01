// const mysql = require("mysql");

// exports.base = (sql, data, callback) => {
//   // 创建数据库
//   const connection = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "283448189",
//     database: "blog",
//   });
//   // 连接数据库
//   connection.connect();
//   // 操作数据库
//   connection.query(sql, data, (error, results, fields) => {
//     if (error) throw error;
//     callback(results);
//     console.log("数据库连接成功");
//   });
//   // 关闭数据库
// //   connection.end();
// };

const mysql = require("node-mysql-promise");

exports.base = (table) => {
  const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "283448189",
    database: "blog",
  });

  return db.table(table);
};
