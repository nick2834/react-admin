const Qiniu = require("../config/qiniu");
const options = require("../config/config");
exports.uploadFile = async(req, res) => {
    const qiniu = new Qiniu(options);
    qiniu
        .fileUpload(req)
        .then(({ respInfo, respBody }) => {
            if (respInfo.statusCode == 200) {
                respBody.key = options.host + respBody.key;
                res.json({ status: 0, data: respBody });
            } else {
                res.json({ status: 1, data: "上传失败，请重试" });
            }
        })
        .catch((err) => {
            res.json({ status: 1, data: "上传失败，请重试" });
        });
};