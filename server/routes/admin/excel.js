const express = require('express');
const WebVocabulary = require('../../models/WebVocabulary');
const moment = require('moment');
const { dlXlsx } = require('../../utils/exporsXmls');
const svgCaptcha = require('svg-captcha');

const router = express.Router({
  mergeParams: true,
})

/**
 * @api {get} /excel/download 导出excel
 * @apiName 导出接口
 * @apiGroup download
 *
 */
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

/**
 * @api {get} /excel/captcha 获取验证码
 * @apiName 获取验证码
 * @apiGroup download
 *
 */
router.get('/captcha', function (req, res) {
  var captcha = svgCaptcha.create({
    color: true,
    // height: 30
  });
  // req.session.captcha = captcha.text;
  const data = Buffer.from(captcha.data, 'utf-8').toString('base64');
  let base64 = 'data:image/svg+xml;base64,' + data;
  res.type('base64');
  res.status(200).send({ code: 200, data: base64, text: captcha.text });
});

module.exports = router