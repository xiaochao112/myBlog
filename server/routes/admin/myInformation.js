const express = require('express');
const MyInformation = require('../../models/MyInformation');
// const assert = require('http-assert');
const router = express.Router({
  mergeParams: true,
})

/**
 * @api {post} /myInformation/info 获取资料卡信息
 * @apiName 获取资料卡信息
 * @apiGroup myInformation
 *
 * @apiParam {Number} pageNo 页数
 * @apiParam {Number} pageSize 条数
 */
router.post('/info', async (req, res) => {
  const pageNo = Number(req.body.pageNo) || 1;
  const pageSize = Number(req.body.pageSize) || 10;
  // 正则方法
  const reg = new RegExp()
  // 计数
  MyInformation.countDocuments((err, count) => {
    if (err) {
      res.send({ code: 500, msg: "列表获取失败" });
      return
    }
    MyInformation.find().skip(pageSize * (pageNo - 1)).limit(pageSize).sort('-createdAt').then(data => {
      res.send({
        code: 200,
        data,
        total: count,
        pageNo: pageNo,
        pageSize: pageSize,
        msg: '列表获取成功',
      })
    })
      .catch(() => {
        res.send({ code: 500, msg: '列表获取失败' })
      });
  })
});

/**
 * @api {post} /myInformation/add 增加一条数据
 * @apiName 增加一条数据
 * @apiGroup myInformation
 *
 * @apiParam {String} title 页数
 * @apiParam {String} desc 条数
 * @apiParam {String} img 图片路径
 */
router.post('/add', (req, res) => {
  let { title, desc } = req.body;
  let data = {}
  if (req.body.img) {
    data = {
      title,
      desc,
      img: req.body.img
    }
  } else {
    data = {
      title,
      desc,
    }
  }
  MyInformation.create(data, (err, desc) => {
    if (!err) {
      console.log(desc);
      res.send({
        code: 200,
        msg: '新增成功',
      })
    }
  })
})


/**
 * @api {post} /myInformation/update 更新一条数据
 * @apiName 更新一条数据
 * @apiGroup myInformation
 *
 * @apiParam {String} _id Id
 * @apiParam {String} title 页数
 * @apiParam {String} desc 条数
 * @apiParam {String} img 图片路径
 */
router.post('/update', (req, res) => {
  let { title, desc, _id, img } = req.body;
  MyInformation.findByIdAndUpdate({ _id }, { title, desc, img }, {}, (err, desc) => {
    if (!err) {
      console.log(desc);
      res.send({
        code: 200,
        msg: '更新成功',
      })
    }
  })
})

/**
 * @api {post} /myInformation/del 删除一条数据
 * @apiName 删除一条数据
 * @apiGroup myInformation
 *
 * @apiParam {String} _id Id
 */
router.post('/del', (req, res) => {
  let { _id } = req.body;
  MyInformation.findByIdAndRemove({ _id }, (err) => {
    if (!err) {
      res.send({
        code: 200,
        msg: '删除成功',
      })
    }
  })
})

module.exports = router