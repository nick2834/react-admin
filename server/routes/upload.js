var express = require("express");
var router = express.Router();
const service = require("../service/qiniuService");
router.get("/", function(req, res, next) {
    res.send("respond with a resource");
});
router.post("/upload", service.uploadFile);
module.exports = router;