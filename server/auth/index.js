const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
// 私钥
const selfKey = fs.readFileSync(path.resolve(__dirname, "./jwt.pem"));
// 公钥
const otherKey = fs.readFileSync(path.resolve(__dirname, "./jwt_pub.pem"));
const authConfig = {
  algorithm: "RS256",
  expiresIn: "15min"
};

class authToken {
  // 加密
  static sign(id, username) {
    return jwt.sign(
      {
        id,
        username
      },
      selfKey,
      authConfig
    );
  }
  static verify(token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, otherKey, authConfig, (err, decode) => {
        if (err) {
          throw reject(err);
        }
        resolve(decode);
      });
    });
  }
}

module.exports = authToken;
