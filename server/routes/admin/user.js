const express = require('express');
const AdminUser = require('../../models/AdminUser');
// const assert = require('http-assert');
const JwtUtil = require('../../jwt');
const router = express.Router({
  mergeParams: true,
})

// 登录接口
router.post('/login', async (req, res) => {
  const { username, password } = req.body
  const user = await AdminUser.findOne({
    username,
  }).select('+password')
  // assert(user, 422, '用户名错误')
  // 没有账号自动注册
  if (!user) {
    const user = await AdminUser.create({
      username: req.body.username,
      password: req.body.password,
    })
    res.send({ code: 200, user })
  }
  const isValid = require('bcryptjs').compareSync(password, user.password)
  if (!isValid) {
    return res.status(422).send({
      message: "密码错误"
    })
  }
  // token加密userId
  let jwt = new JwtUtil(user._id);
  // 继承原型上的生成token方法
  let token = jwt.generateToken();
  res.send({
    code: 200,
    token
  })
})

// 获取用户信息
router.post('/info', async (req, res) => {
  const token = req.headers['x-token'];
  // token解码
  let jwt = new JwtUtil(token);
  let _id = jwt.verifyToken();
  const user = await AdminUser.findById({ _id });
  res.send({ code: 200, user });
})

module.exports = router;