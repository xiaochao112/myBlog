const express = require('express');
const TogList = require('../../models/TogList');
const { getCounter } = require('../../utils/counter');
// const assert = require('http-assert');
const router = express.Router({
  mergeParams: true,
})

// 获取标签列表
router.post('/page', (req, res) => {
  const pageNo = Number(req.body.pageNo) || 1;
  const pageSize = Number(req.body.pageSize) || 10;
  const reg = new RegExp()
  // 计数
  TogList.countDocuments((err, count) => {
    if (err) {
      res.send({ code: 500, msg: "列表获取失败" });
      return
    }
    TogList.find().skip(pageSize * (pageNo - 1)).limit(pageSize).sort('-createdAt').then(data => {
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
  let { togTitle, desc } = req.body;
  TogList.find({ togTitle }).then(data => {
    if (data.length === 0) {
      return getCounter('tog')
    } else {
      res.send({
        code: 203,
        msg: '该数据已存在，请勿重复添加',
      })
    }
  })
    .then(id => {
      TogList.create({ togTitle, desc, typeId: id }, (err, docs) => {
        if (!err) {
          res.send({
            code: 200,
            msg: '新增成功',
          })
        }
      })
    });
})

// 更新一条数据
router.post('/update', (req, res) => {
  let { togTitle, desc, _id } = req.body;
  TogList.findByIdAndUpdate({ _id }, { togTitle, desc }, {}, (err, docs) => {
    if (!err) {
      res.send({
        code: 200,
        msg: '更新成功',
      })
    } else {
      res.send({
        code: 203,
        msg: err,
      })
    }
  })
})

// 删除一条数据
router.post('/del', (req, res) => {
  const { _id } = req.body
  TogList.findByIdAndRemove({ _id }, (err) => {
    if (!err) {
      res.send({
        code: 200,
        msg: '删除成功',
      })
    } else {
      res.send({
        code: 203,
        msg: err,
      })
    }
  })
})

module.exports = router