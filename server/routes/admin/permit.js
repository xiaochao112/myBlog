const express = require('express');
const AdminUser = require('../../models/AdminUser');
const Role = require('../../models/Role');
const Permit = require('../../models/Permit');
const AutoRoutes = require('../../models/AutoRoutes');
// const assert = require('http-assert');
const JwtUtil = require('../../utils/jwt');
const { getCounter } = require('../../utils/counter');
const router = express.Router({
  mergeParams: true,
})

/**
 * @api {post} /permit/add 增加一个权限
 * @apiName 增加一个权限
 * @apiGroup permit
 *
 * @apiParam {String} name 权限名
 * @apiParam {String} mark 描述
 */
router.post('/add', (req, res) => {
  let { name, mark } = req.body
  Permit.find({ name }).then(data => {
    if (data.length == 0) {
      return getCounter('permit')
    } else {
      res.send({ code: 203, msg: '该数据已存在，请勿重复添加' })
    }
  })
    .then(id => {
      return Permit.create({ name, mark, id })
    })
    .then(() => { res.send({ code: 200, msg: '创建成功' }) })
    .catch(err => { res.send({ code: 203, msg: err }) })
})

/**
 * @api {post} /permit/menus 获取当前用户权限列表
 * @apiName 获取当前用户权限列表
 * @apiGroup permit
 *
 */
router.post('/menus', (req, res) => {
  const { token } = req.headers
  let authIds = ''
  // token解码
  let jwt = new JwtUtil(token);
  let result = jwt.verifyToken();
  // 如果验证通过就next，否则就返回登陆信息不正确
  if (result === 'err') {
    res.status(401).send({ msg: '登录已过期,请重新登录' });
  } else {

    AdminUser.findById({ _id: result })
      .then(data => {
        return Role.find({ roleId: data.roleId })
      })
      .then(data => {
        authIds = data[0].authIds.split(',')
        return Permit.find().select('name id -_id');
      })
      .then(list => {
        let permitArr = []
        list.map(item => {
          if (authIds.includes(item.id.toString())) {
            permitArr.push(item);
          }
        })
        res.send({ code: 200, data: permitArr, msg: '权限列表获取成功' });
      });
  }
})

/**
 * @api {post} /permit/del 删除权限
 * @apiName 删除权限
 * @apiGroup permit
 *
 * @apiParam {String} _id 权限Id
 */
router.post('/del', (req, res) => {
  let { _id } = req.body
  Permit.findOneAndRemove({ _id }, (err) => {
    if (!err) {
      res.send({
        code: 200,
        msg: '删除成功',
      })
    }
  })
})
/**
 * @api {post} /permit/del 获取路由权限列表
 * @apiName 路由权限
 * @apiGroup permit
 */
router.get('/getRoutes', (req, res) => {

  AutoRoutes.find().select('-__v').then(data => {
    console.log(data)
    res.send({
      code: 200,
      data,
      msg: '列表获取成功',
    })
  })
    .catch(() => {
      res.send({ code: 500, msg: '列表获取失败' })
    });
})

router.post('/addRoutes', (req, res) => {
  let { path, name, component, children, meta } = req.body
  AutoRoutes.find({ name }).then(data => {
    if (data.length == 0) {
      return getCounter('permit')
    } else {
      res.send({ code: 203, msg: '该数据已存在，请勿重复添加' })
    }
  })
    .then(id => {
      return AutoRoutes.create({ path, name, component, children, meta })
    })
    .then(() => { res.send({ code: 200, msg: '创建成功' }) })
    .catch(err => { res.send({ code: 203, msg: err }) })
})

module.exports = router
