const express = require('express');
const WebVocabulary = require('../../models/WebVocabulary');
// const assert = require('http-assert');
const router = express.Router({
  mergeParams: true,
})

// 获取资料卡信息
router.get('/info', async (req, res) => {
  let data = await WebVocabulary.find((err, docs) => {
    if (!err) {
      // console.log(docs)
    }
  });
  res.send({
    code: 200,
    data,
  })
});

// 增加一条数据
router.post('/add', async (req, res) => {
  let { title, english, desc } = req.body;
  // 设置首字母小写
  let word = english.slice(0, 1).toLowerCase();
  const data = await WebVocabulary.find({ english });
  if (!data) {
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