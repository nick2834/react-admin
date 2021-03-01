var express = require("express");
var router = express.Router();
const service = require("../service/articleService");
router.post("/list", service.list);
router.post("/add", service.add);
router.post("/del", service.del);
router.post("/getByid", service.getByid);
module.exports = router;
