var express = require("express");
var router = express.Router();
const service = require("../service/roleService");
/* GET users listing. */
router.get("/", function(req, res, next) {
    res.send("respond with a resource");
});
// 登录
router.post("/list", service.list);
router.post("/add", service.add);
module.exports = router;