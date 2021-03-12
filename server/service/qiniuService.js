const qiniu = require("qiniu");
const fs = require("fs");
var config = new qiniu.conf.Config();
config.zone = qiniu.zone.Zone_z2;
const ACCESS_KEY = "V2RqWDyAAVcIHZPwHXnSLz2qkblmOpWyCtDkoYvY";
const SECRET_KEY = "8eIK36TGUTyhpVjarxhdyP2LILss4cXwEOrxEMuP";

//要上传的空间
const bucket = "nico_blog.s3-cn-south-1.qiniucs.com";

const key = "qiniu.png";

var mac = new qiniu.auth.digest.Mac(ACCESS_KEY, SECRET_KEY);

var options = {
    scope: bucket,
    expires: 7200,
    returnBody: '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","name":"$(x:name)"}',
};
var putPolicy = new qiniu.rs.PutPolicy(options);
var uploadToken = putPolicy.uploadToken(mac);

var formUploader = new qiniu.form_up.FormUploader(config);
var putExtra = new qiniu.form_up.PutExtra();
//构造上传函数
exports.uploadFile = async(req, res) => {
    const localFile = req.body;
    console.log(await req.multipart())
    formUploader.putFile(
        uploadToken,
        key,
        localFile,
        putExtra,
        (respErr, respBody, respInfo) => {
            if (respErr) {
                throw respErr;
            }
            if (respInfo.statusCode == 200) {
                console.log(respBody);
            } else {
                console.log(respInfo.statusCode);
                console.log(respBody);
            }
        }
    );
};