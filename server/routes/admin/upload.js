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
    const workbook = xlsx.readFile('./static/excel/' + filename) // 读取excel文件
    const sheetNames = workbook.SheetNames //获取表名称数组

    // 可以做一个判断验证excel转换的json是否是后端需要的
    // reject('文件格式不对')
    let _this = []
    for (let i = 0; i < sheetNames.length; i++) {
      let data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetNames[i]]) //通过工具将表对象的数据读出来并转成json
      // console.log('-----', data)
      data.map((item, index) => {
        // 这里根据具体业务来进行操作
        // console.log(item);
        _this.push({
          title: item['中文'],
          english: item['英文'],
          word: item['英文'].slice(0, 1).toUpperCase(),
          desc: item['备注'] || ''
        })
      })
    }
    resolve(_this)
  })
  return temp
}

// 上传头像storage
// 磁盘存储引擎 (DiskStorage)
// 磁盘存储引擎可以让你控制文件的存储。
var storage = multer.diskStorage({
  // destination是用来确定上传的文件应该存储在哪个文件夹中
  destination: function (req, file, cb) {
    cb(null, './static/img')
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

var upload = multer({ storage: storage }).single('avatar')

// 上传Excel文件storage
// 磁盘存储引擎 (DiskStorage)
// 磁盘存储引擎可以让你控制文件的存储。
var excelstorage = multer.diskStorage({
  // destination是用来确定上传的文件应该存储在哪个文件夹中
  destination: function (req, file, cb) {
    cb(null, './static/excel');
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
 * @apiParam {String} avatar excel文件（）
 */
router.post('/import', excel, async (req, res) => {
  let temp = await WebVocabulary.find({}, { _id: 0, title: 1, english: 1, desc: 1, word: 1 });
  parseExcel(req.file.filename)
    .then((data) => {
      // 对上传的文件数据进行查重
      function cutarray(arr) {
        let obj = {};    //obj用来记录该项重复出现了几次
        let brr = [];    //brr是去重后的数组
        arr.forEach((item) => {
          if (obj[item.title] == undefined) {
            obj[item.title] = 1;
            brr.push(item);
          } else {
            obj[item.title] += 1;
          }
        });
        return brr;
      }
      let arr = cutarray(data);
      let dataSql = []; // 要存进数据库的数据
      let cfSum = 0; // 重复数据的数量 
      let dataSum = 0; // 要存进数据库的数据数量
      arr.forEach((item) => {
        // 查找是否存在于数据库数据中
        let Item = temp.find(element => element.title == item.title);
        if (!Item) {
          dataSum++;
          dataSql.push(item);
        } else {
          cfSum++;
        }
      })
      WebVocabulary.insertMany(dataSql);
      res.send({ code: 200, msg: '添加成功', cfSum, dataSum });
    })
    .catch((err) => {
      res.send({ code: 500, msg: '失败' });
    })
})

/**
 * @api {post} /picture 图片上传
 * @apiName 图片上传
 * @apiGroup File
 *
 * @apiParam {String} avatar 上传文件
 */
router.post(
  '/picture',
  upload,
  (req, res) => {
    const { size, mimetype, filename, destination } = req.file
    const fileTypeList = ['jpg', 'jpeg', 'gif', 'png']
    if (size > 512000) {
      return res.status(500).send({ msg: '上传文件太大' })
    } else if (fileTypeList.indexOf(mimetype.split('/')[1]) === -1) {
      return res.status(500).send({ msg: '文件格式不正确' })
    }
    res.send({
      code: 200,
      imgUrl: destination.substring(1) + '/' + filename,
      msg: '上传成功',
    })
  }
)
module.exports = router;