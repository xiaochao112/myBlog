const express = require('express');
const Role = require('../../models/Role');
const { getCounter } = require('../../utils/counter');

// const assert = require('http-assert');
const router = express.Router({
  mergeParams: true,
})

/**
 * @api {post} /role/add 增加一个角色
 * @apiName 增加一个角色
 * @apiGroup role
 *
 * @apiParam {String} roleName 角色名
 * @apiParam {String} roleDesc 描述
 */
router.post('/add', (req, res) => {
  let { roleName, roleDesc } = req.body
  Role.find({ roleName }).then(data => {
    if (data.length == 0) {
      return getCounter('role')
    } else {
      res.send({ code: 203, msg: '该数据已存在，请勿重复添加' })
    }
  })
    .then(roleId => {
      return Role.create({ roleName, roleDesc, roleId })
    })
    .then(() => { res.send({ code: 200, msg: '创建成功' }) })
    .catch(err => { res.send({ code: 203, msg: '创建失败' }) })
})

/**
 * @api {post} /role/update 更新角色信息
 * @apiName 更新角色信息
 * @apiGroup role
 *
 * @apiParam {String} roleName 角色名
 * @apiParam {String} roleDesc 描述
 * @apiParam {Number} roleId 角色Id
 */
router.post('/update', (req, res) => {
  let { roleName, roleDesc, roleId } = req.body
  Role.updateOne({ roleId }, { roleName, roleDesc })
    .then((data) => { res.send({ code: 200, msg: '更新成功' }) })
    .catch(err => { res.send({ code: 203, msg: '更新失败' }) })
})

/**
 * @api {post} /role/del 删除角色
 * @apiName 删除角色
 * @apiGroup role
 *
 * @apiParam {Number} roleId 角色Id
 */
router.post('/del', (req, res) => {
  let { roleId } = req.body
  Role.findOneAndRemove({ roleId }, (err) => {
    if (!err) {
      res.send({
        code: 200,
        msg: '删除成功',
      })
    }
  })
})

/**
 * @api {post} /role/setPermits 更新角色权限
 * @apiName 更新角色权限
 * @apiGroup role
 *
 * @apiParam {Number} roleId 角色Id
 * @apiParam {String} authIds 权限集合字符串
 */
router.post('/setPermits', (req, res) => {
  let { roleId, authIds } = req.body
  Role.updateOne({ roleId }, { $set: { authIds } })
    .then((data) => { res.send({ code: 200, msg: '更新成功' }) })
    .catch(err => { res.send({ code: 203, msg: '更新失败' }) })
})

module.exports = router
