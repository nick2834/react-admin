var express = require("express");
var router = express.Router();
const qiniu = require("qiniu");

qiniu.conf.ACCESS_KEY = "V2RqWDyAAVcIHZPwHXnSLz2qkblmOpWyCtDkoYvY";
qiniu.conf.SECRET_KEY = "8eIK36TGUTyhpVjarxhdyP2LILss4cXwEOrxEMuP";

//要上传的空间
bucket = "http://nico_blog.s3-cn-south-1.qiniucs.com";
// 登录
router.post("/qiniu/upload", (req, res, next) => {});
router.post("/qiniu/download", (req, res, next) => {});
module.exports = router;
