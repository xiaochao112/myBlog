// 引入模块依赖
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
// express-jwt用于将JWT字符串解析还原成JSON对象
// const expressJWT = require('express-jwt')
// 创建 token 类
class Jwt {
  constructor(data) {
    this.data = data;

  }
  //生成token
  generateToken() {
    let data = this.data;
    let created = Math.floor(Date.now() / 1000);
    // let cert = fs.readFileSync(path.join(__dirname, '../pem/private_key.pem'));//私钥 可以自己生成
    let secretKey = 'i2u34y12oi3u4y8'
    // let token = jwt.sign({
    //     data,
    //     exp: created + 60 * 30,
    // }, cert, {algorithm: 'RS256'});
    /* 
        登录成功生成token
        参数1：用户信息 **不能把密码加密到token里,要写成对象形式
        参数2：加密的秘钥
        参数3：配置对象，可以是当前token的有效期 expiresIn: 100
    */
    let token = jwt.sign({ data }, secretKey, { expiresIn: '24h' })
    return token;
  }


  // 校验token
  verifyToken() {
    let token = this.data;
    // let cert = fs.readFileSync(path.join(__dirname, '../pem/public_key.pem'));//公钥 可以自己生成
    let cert = 'i2u34y12oi3u4y8'
    let res;
    try {
      let result = jwt.verify(token, cert);
      let { exp = 0 } = result, current = Math.floor(Date.now() / 1000);
      if (current <= exp) {
        res = result.data || {};
      }
    } catch (e) {
      res = 'err';
    }
    return res;
  }
}

module.exports = Jwt;
