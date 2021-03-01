var cors = require("cors");
var auth = require("./auth");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var articleRouter = require("./routes/article");
var cateRouter = require("./routes/category");
// https://github.com/LFB/nodejs-koa-blog/blob/770810e21130f3d910067b9139d95589a4e33118/core/init.js#L5
class InitManager {
  static initCore(app) {
    InitManager.app = app;
    InitManager.initLoadRouters();
  }

  static initLoadRouters() {
    InitManager.app.use(cors());
    InitManager.app.all("/*", function(req, res, next) {
      // 跨域处理
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "X-Requested-With");
      res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
      res.header("X-Powered-By", " 3.2.1");
      res.header("Content-Type", "application/json;charset=utf-8");
      next(); // 执行下一个路由
    });
    const apiDirectory = `${process.cwd()}/routes`;
    InitManager.app.use("/", indexRouter);
    InitManager.app.use("/api/users", usersRouter);
    InitManager.app.use("/api/article", articleRouter);
    InitManager.app.use("/api/category", cateRouter);
  }
}

module.exports = InitManager;
