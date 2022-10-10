const express = require('express');
const MyInformation = require('../../models/MyInformation');
// const assert = require('http-assert');
const router = express.Router({
  mergeParams: true,
})

// 获取资料卡信息
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

// 增加一条数据
router.post('/add', (req, res) => {
  let { title, desc } = req.body;
  MyInformation.create({ title, desc }, (err, desc) => {
    if (!err) {
      console.log(desc);
      res.send({
        code: 200,
        msg: '新增成功',
      })
    }
  })
})


// 更新一条数据
router.post('/update', (req, res) => {
  let { title, desc, _id } = req.body;
  MyInformation.findByIdAndUpdate({ _id }, { title, desc }, {}, (err, desc) => {
    if (!err) {
      console.log(desc);
      res.send({
        code: 200,
        msg: '更新成功',
      })
    }
  })
})

// 删除一条数据
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