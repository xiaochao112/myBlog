const express = require('express');
const WebVocabulary = require('../../models/WebVocabulary');
// const assert = require('http-assert');
const router = express.Router({
  mergeParams: true,
})

// 获取词汇列表
router.post('/page', (req, res) => {
  const pageNo = Number(req.body.pageNo) || 1;
  const pageSize = Number(req.body.pageSize) || 10;
  const reg = new RegExp()
  // 计数
  WebVocabulary.countDocuments((err, count) => {
    if (err) {
      res.send({ code: 500, msg: "列表获取失败" });
      return
    }
    WebVocabulary.find().skip(pageSize * (pageNo - 1)).limit(pageSize).sort('-createdAt').then(data => {
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
router.post('/add', async (req, res) => {
  let { title, english, desc } = req.body;
  // 设置首字母大写
  let word = english.slice(0, 1).toUpperCase();
  const data = await WebVocabulary.find({ english });
  console.log(data);
  if (!data.title) {
    WebVocabulary.create({ title, english, desc, word }, (err, docs) => {
      if (!err) {
        res.send({
          code: 200,
          msg: '新增成功',
        })
      }
    })
  } else {
    res.send({
      code: 203,
      msg: '该数据已存在，请勿重复添加',
    })
  }
})

// 更新一条数据
router.post('/update', (req, res) => {
  let { title, english, word, _id } = req.body;
  WebVocabulary.findByIdAndUpdate({ _id }, { title, english, word }, {}, (err, docs) => {
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
router.post('/del', (req, res) => {
  const { _id } = req.body
  WebVocabulary.findByIdAndRemove({ _id }, (err) => {
    if (!err) {
      res.send({
        code: 200,
        msg: '删除成功',
      })
    }
  })
})

module.exports = router