module.exports = options => {
  const assert = require('http-assert')
  const JwtUtil = require('../jwt')

  return (req, res, next) => {
    console.log(req.url);
    if (req.url !== '/login') {
      let token = req.headers['token'];
      if (!token) {
        res.status(401).send({ msg: 'token不能为空' });
      }
      let jwt = new JwtUtil(token);
      let result = jwt.verifyToken();
      // 如果验证通过就next，否则就返回登陆信息不正确
      if (result === 'err') {
        res.status(401).send({ msg: '登录已过期,请重新登录' });
      } else {
        next();
      }
    } else {
      next();
    }
  }
}