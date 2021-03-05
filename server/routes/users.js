var express = require("express");
var router = express.Router();
const service = require("../service/userService");
/* GET users listing. */
router.get("/", function(req, res, next) {
    res.send("respond with a resource");
});
// 登录
router.post("/login", service.login);
router.post("/add", service.add);
router.post("/update", service.update);
router.post("/list", service.list);
router.delete("/delete/:user_id", service.delete);
module.exports = router;