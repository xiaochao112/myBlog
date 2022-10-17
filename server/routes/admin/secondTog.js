const express = require('express');
const TogItem = require('../../models/secondTog');
const firstTog = require('../../models/firstTog');
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
  TogItem.countDocuments((err, count) => {
    if (err) {
      res.send({ code: 500, msg: "列表获取失败" });
      return
    }
    TogItem.find().skip(pageSize * (pageNo - 1)).limit(pageSize).sort('-createdAt').then(data => {
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

  //   TogItem.countDocuments((err, count) => {
  //     if (err) {
  //       res.send({ code: 500, msg: "列表获取失败" });
  //       return
  //     }
  //     TogItem.aggregate([
  //       {
  //         $match: {}
  //       },
  //       {
  //         $lookup: { // 多表联查  通过roleId获取foodtypes表数据
  //           from: "firstTogs", // 需要关联的表roles
  //           localField: "typeId", // TogItem表需要关联的键
  //           foreignField: "typeId", // firstTogs表需要关联的键
  //           as: "firstTogs" // 对应的外键集合的数据，是个数组 例如： "roles": [{ "roleName": "超级管理员"}]
  //         }
  //       },
  //       {
  //         $skip: pageSize * (pageNo - 1)
  //       },
  //       {
  //         $limit: pageSize
  //       },
  //       // {
  //       // $project中的字段值 为1表示筛选该字段，为0表示过滤该字段
  //       // $project: { firstTogs: { secondTitle: 1, __v: 0, _id: 0 } }
  //       // }
  //     ], (err, docs) => {
  //       if (err) {
  //         console.log(err);
  //         res.send({ code: 500, msg: '商品列表获取失败' })
  //         return;
  //       }
  //       res.send({
  //         code: 200,
  //         data: docs,
  //         total: count,
  //         pageNo: pageNo,
  //         pageSize: pageSize,
  //         msg: '商品列表获取成功',
  //       })
  //     })
  //   })
});

// 增加一条数据
router.post('/add', (req, res) => {
  let { secondTitle, desc, typeId } = req.body;
  TogItem.find({ secondTitle }).then(data => {
    if (data.length === 0) {
      TogItem.create({ secondTitle, desc, typeId }, (err, docs) => {
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
})

// 更新一条数据
router.post('/update', (req, res) => {
  let { secondTitle, desc, _id } = req.body;
  TogItem.findByIdAndUpdate({ _id }, { secondTitle, desc }, {}, (err, docs) => {
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
  TogItem.findByIdAndRemove({ _id }, (err) => {
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