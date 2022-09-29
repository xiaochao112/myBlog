const express = require('express');
const MyInformation = require('../../models/MyInformation');
// const assert = require('http-assert');
const router = express.Router({
  mergeParams: true,
})

// 获取资料卡信息
router.get('/info', async (req, res) => {
  let data = await MyInformation.find((err, docs) => {
    if (!err) {
      console.log(docs)
    }
  });
  res.send({
    code: 200,
    data,
  })
});

// 增加一条数据
router.post('add', (req, res) => {
  let { title, img, dosc } = req.data;
  MyInformation.create({ title, img, dosc }, (err, docs) => {
    if (!err) {
      console.log(docs);
      res.send({
        code: 200,
        msg: '新增成功',
      })
    }
  })
})

// 更新一条数据
router.post('update', (req, res) => {
  let { title, img, dosc, _id } = req.data;
  MyInformation.findByIdAndUpdate({ _id }, { title, img, dosc }, {}, (err, docs) => {
    if (!err) {
      console.log(docs);
      res.send({
        code: 200,
        msg: '更新成功',
      })
    }
  })
})

// 删除一条数据
router.post('del', (req, res) => {
  let { _id } = req.data;
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