const express = require('express');
const AdminUser = require('../../models/AdminUser');
// const assert = require('http-assert');
const bcrypt = require('bcryptjs')
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
  const isValid = bcrypt.compareSync(password, userArr.password)
  if (!isValid) {
    return res.status(422).send({
      msg: "密码错误, 请重新登录"
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
    msg: '登录成功'
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

// 修改密码
router.post('/updatePassword', (req, res) => {
  const { _id, password } = req.body;
  // const newPwd = bcrypt.hashSync(password, 10);
  AdminUser.findByIdAndUpdate({ _id }, { password }, {},
    (err, data) => {
      if (err) {
        console.log('更新失败');
        res.status(402).send({ msg: err })
      }
      if (data) {
        console.log('更新成功');
        res.send({
          msg: '修改成功'
        })
      }
    })
})

// 上传头像
router.post('/avatar', (req, res) => {
  const { _id, avatar } = req.body;
  AdminUser.findByIdAndUpdate({ _id }, { avatar }, {},
    (err, data) => {
      if (err) {
        console.log('上传失败');
        res.status(402).send({ msg: err })
      }
      if (data) {
        console.log('上传成功');
        res.send({
          msg: '上传成功'
        })
      }
    })
})

module.exports = router;