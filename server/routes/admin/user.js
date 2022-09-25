const express = require('express');
const AdminUser = require('../../models/AdminUser');
// const assert = require('http-assert');
const JwtUtil = require('../../jwt');
const router = express.Router({
  mergeParams: true,
})

// 登录接口
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  let userArr = {}
  userArr = await AdminUser.findOne({
    username,
  }).select('+password')
  // assert(user, 422, '用户名错误')
  // 没有账号自动注册
  if (!userArr) {
    userArr = await AdminUser.create({
      username: req.body.username,
      password: req.body.password,
    })
  }
  const isValid = require('bcryptjs').compareSync(password, userArr.password)
  if (!isValid) {
    return res.status(422).send({
      message: "密码错误"
    })
  }
  AdminUser.update({ _id: userArr._id }, { endLoginTime: Math.floor(Date.now() / 1000) }, (err, raw) => {
    console.log(raw)
  })

  // token加密userId
  let jwt = new JwtUtil(userArr._id);
  // 继承原型上的生成token方法
  let token = jwt.generateToken();
  res.send({
    code: 200,
    data: {
      token
    },
    msg: '成功'
  })
})

// 获取用户信息
router.get('/info', async (req, res) => {
  const token = req.headers['token'];
  // token解码
  let jwt = new JwtUtil(token);
  let _id = jwt.verifyToken();
  const user = await AdminUser.findById({ _id });
  res.send({ code: 200, user });
})

module.exports = router;