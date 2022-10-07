const express = require('express');
const multer = require('multer');
const WebVocabulary = require('../../models/WebVocabulary')
const fs = require('fs')
const path = require('path')
const xlsx = require('xlsx')
const router = express.Router({
  mergeParams: true,
})

// 解析excel文件
function parseExcel(filename) {
  let temp = new Promise(function (resolve, reject) {
    const workbook = xlsx.readFile('../../uploads/' + filename) // 读取excel文件
    const sheetNames = workbook.SheetNames //获取表名称数组

    // 可以做一个判断验证excel转换的json是否是后端需要的
    // reject('文件格式不对')
    let _this = []
    for (let i = 0; i < sheetNames.length; i++) {
      let data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetNames[i]]) //通过工具将表对象的数据读出来并转成json
      // console.log('-----', data)
      data.map((item, index) => {
        // 这里根据具体业务来进行操作
        console.log(item);
        // _this.push({
        //   key: item['变量'],
        //   'zh-CN': item['中文'],
        //   notice: item['解释中文'],
        // })
      })
    }
    resolve(_this)
  })
  return temp
}
// storage
// 磁盘存储引擎 (DiskStorage)
// 磁盘存储引擎可以让你控制文件的存储。
var excelstorage = multer.diskStorage({
  // destination是用来确定上传的文件应该存储在哪个文件夹中
  destination: function (req, file, cb) {
    cb(null, '../../static/excel');
  },
  // filename 用于确定文件夹中的文件名的确定
  filename: function (req, file, cb) {
    const timestamp = Date.now().toString()
    const randomNum = parseInt(Math.random() * 9999).toString()
    const suffix = file.originalname.split('.')[
      file.originalname.split('.').length - 1
    ]
    cb(null, `${timestamp}${randomNum}.${suffix}`)
  },
})

var excel = multer({ storage: excelstorage }).single('avatar')

/**
 * @api {post} /excel/import 前端词汇批量添加
 * @apiName 前端词汇批量添加
 * @apiGroup Lang
 *
 * @apiParam {String} avatar excel文件（中文 解释中文 英语 越南语 泰语 印度语）
 */
router.post('/import', excel, (req, res) => {
  console.log(req.file.filename);
  res.send({ code: 200, msg: '添加成功' })

  // parseExcel(req.file.filename)
  //   .then((data) => {
  //     // 是否重复
  //     // const temp = []
  //     // data.map((item, index) => {
  //     //   if (Lang.find({ key: item.key })) {
  //     //     temp.push(item)
  //     //     data.splice(index, 1)
  //     //   }
  //     // })
  //     // console.log('data', data, 'temp', temp)
  //     WebVocabulary.insertMany(data)
  //     // res.send({ code: 200, msg: '添加成功' })
  //   })
  // .then(data => {
  //   res.send({ code: 200, msg: '添加成功' })
  // })
  // .catch((err) => {
  //   res.send({ code: 500, msg: '失败' })
  // })
})

//本地头像上传
// const multer = require('multer')
const upload = multer({
  dest: __dirname + '/../../uploads',
})
router.post(
  '/picture',
  upload.single('file'),
  async (req, res) => {
    const file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)

  }
)
module.exports = router;