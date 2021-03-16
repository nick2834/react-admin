const qiniu = require("qiniu");
const { IncomingForm } = require("formidable");
const path = require("path");
const fs = require("fs");
const form = IncomingForm();
//配置临时文件夹
const staticFile = "../temp";
class Qiniu {
    constructor(options) {
            this.accessKey = options.accessKey;
            this.secretKey = options.secretKey;
            this.expires = options.expires;
            this.bucket = options.bucket;
            this.returnBody = options.returnBody;
            this.zone = options.zone;
            this.host = options.host;
        }
        /**
         * 简单上传凭证
         */
    simpleToken() {
        const mac = new qiniu.auth.digest.Mac(this.accessKey, this.secretKey);
        const options = {
            scope: this.bucket,
            expires: this.expires,
            returnBody: this.returnBody,
        };
        const putPolicy = new qiniu.rs.PutPolicy(options);
        return putPolicy.uploadToken(mac);
    }

    /**
     * 以本地文件方式上传
     * @param {文件路径} filePath
     */
    fileUpload(filePath) {
            let _this = this;
            const uploadToken = this.simpleToken();
            const config = new qiniu.conf.Config();
            // 空间对应的机房
            config.zone = qiniu.zone[this.zone];
            const formUploader = new qiniu.form_up.FormUploader(config);
            const putExtra = new qiniu.form_up.PutExtra();

            form.uploadDir = path.join(__dirname, staticFile);
            form.keepExtensions = true;

            // 文件上传
            return new Promise((resolved, reject) => {
                form.parse(filePath, (err, fields, files) => {
                    const uploadFile = files.file.path;
                    const localFile = uploadFile.split(path.sep).pop();
                    const key = `blog/${localFile}`;
                    if (err) {
                        console.log(err);
                    }
                    formUploader.putFile(
                        uploadToken,
                        key,
                        uploadFile,
                        putExtra,
                        function(respErr, respBody, respInfo) {
                            if (respErr) {
                                reject(respErr);
                            }
                            resolved({
                                respInfo,
                                respBody
                            })
                            _this.removeTempFile(uploadFile);
                        }
                    );
                });
            });
        }
        /**
         * @param {删除临时文件} filePath
         */
    removeTempFile(filePath) {
        if (filePath) {
            fs.unlink(filePath, (err) => {
                // console.log(err);
            });
        }
    }
}
module.exports = Qiniu;