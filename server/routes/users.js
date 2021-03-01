var express = require("express");
var router = express.Router();
const service = require("../service/userService");
/* GET users listing. */
router.get("/", function(req, res, next) {
    res.send("respond with a resource");
});
// 登录
router.post("/login", service.login);
router.post("/register", service.register);
router.post("/update", service.update);
module.exports = router;