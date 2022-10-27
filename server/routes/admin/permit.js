const express = require('express');
const Permit = require('../../models/Permit');
// const assert = require('http-assert');
const router = express.Router({
  mergeParams: true,
})

/**
 * @api {get} /permit/add 增加一个权限
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



module.exports = router
