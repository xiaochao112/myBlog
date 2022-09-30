const express = require('express');
const WebVocabulary = require('../../models/WebVocabulary');
const moment = require('moment');
const { dlXlsx } = require('../../utils/exporsXmls');

const router = express.Router({
  mergeParams: true,
})

// 导出接口
router.get('/download', (req, res) => {
  let cols = ['中文', '单词', '备注'];
  let fields = {
    title: 1,
    english: 1,
    desc: 1
  }
  WebVocabulary.find({}, fields, (err, docs) => {
    if (err) throw err
  }).then(data => {
    console.log(data);
    dlXlsx(data).then(data => {
      res.set({
        'Content-Type': 'application/octet-stream', // 告诉浏览器这是一个二进制文件
        'Content-Disposition': 'attachment; filename=Asnull.xlsx' // 告诉浏览器这是一个需要下载的文件并且文件名为Asnull.xlsx
      });
      res.download('1.xlsx');
    })
      .catch(err => {
        res.send({
          code: 500, msg: err
        })
      })
  })
    .catch(err => {
      res.send({
        code: 500, msg: err
      })
    })
})

// 上传接口
router.get('/upload')


module.exports = router