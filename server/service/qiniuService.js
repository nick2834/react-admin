const qiniu = require("qiniu");

qiniu.conf.ACCESS_KEY = "V2RqWDyAAVcIHZPwHXnSLz2qkblmOpWyCtDkoYvY";
qiniu.conf.SECRET_KEY = "8eIK36TGUTyhpVjarxhdyP2LILss4cXwEOrxEMuP";

//要上传的空间
bucket = "nico_blog.s3-cn-south-1.qiniucs.com";

key = "";

//构建上传策略函数
function uptoken(bucket, key) {
  var putPolicy = new qiniu.rs.PutPolicy(bucket + ":" + key);
  return putPolicy.token();
}
//生成上传 Token
token = uptoken(bucket, key);

//要上传文件的本地路径
filePath = "./ruby-logo.png";

//构造上传函数
function uploadFile(uptoken, key, localFile) {
  var extra = new qiniu.io.PutExtra();
  qiniu.io.putFile(uptoken, key, localFile, extra, function(err, ret) {
    if (!err) {
      // 上传成功， 处理返回值
      console.log(ret.hash, ret.key, ret.persistentId);
    } else {
      // 上传失败， 处理返回代码
      console.log(err);
    }
  });
}
