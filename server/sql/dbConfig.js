const mysql = require("node-mysql-promise");

exports.base = (table, status = true) => {
    const db = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "283448189",
        database: "blog",
    });

    return status ? db.table(table) : db.query(table);
};