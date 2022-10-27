const express = require('express');
const firstTog = require('../../models/firstTog');
const { getCounter } = require('../../utils/counter');
// const assert = require('http-assert');
const router = express.Router({
  mergeParams: true,
})

/**
 * @api {get} /tagList/page 获取一级标签列表
 * @apiName 获取一级标签列表
 * @apiGroup tag
 *
 * @apiParam {Number} pageNo 页数
 * @apiParam {Number} pageSize 条数
 * @apiParam {Number} typeId 类型(可选)
 */
router.post('/page', (req, res) => {
  const pageNo = Number(req.body.pageNo) || 1;
  const pageSize = Number(req.body.pageSize) || 20;
  const { typeId } = req.body;
  let query = {}
  if (typeId) {
    query = {
      typeId
    }
  }
  const reg = new RegExp()
  // 计数
  firstTog.countDocuments(query, (err, count) => {
    if (err) {
      res.send({ code: 500, msg: "列表获取失败" });
      return
    }
    firstTog.aggregate([
      {
        $match: query
      },
      {
        $lookup: { // 多表联查  通过roleId获取foodtypes表数据
          from: "secondtogs", // 需要关联的表roles
          localField: "typeId", // TogItem表需要关联的键
          foreignField: "typeId", // firstTogs表需要关联的键
          as: "secondtags" // 对应的外键集合的数据，是个数组 例如： "roles": [{ "roleName": "超级管理员"}]
        }
      },
      {
        $skip: pageSize * (pageNo - 1)
      },
      {
        $limit: pageSize
      },
      // {
      // $project中的字段值 为1表示筛选该字段，为0表示过滤该字段
      // $project: { firstTogs: { title: 1, __v: 0, _id: 0 } }
      // }
    ], (err, docs) => {
      if (err) {
        console.log(err);
        res.send({ code: 500, msg: '商品列表获取失败' })
        return;
      }
      res.send({
        code: 200,
        data: docs,
        total: count,
        pageNo: pageNo,
        pageSize: pageSize,
        msg: '商品列表获取成功',
      })
    })
      // firstTog.find().skip(pageSize * (pageNo - 1)).limit(pageSize).sort('-createdAt').then(data => {
      //   res.send({
      //     code: 200,
      //     data,
      //     total: count,
      //     pageNo: pageNo,
      //     pageSize: pageSize,
      //     msg: '列表获取成功',
      //   })
      // })
      .catch(() => {
        res.send({ code: 500, msg: '列表获取失败' })
      });
  })
});

/**
 * @api {get} /tagList/add 增加一条数据
 * @apiName 增加一条数据
 * @apiGroup tag
 *
 * @apiParam {String} title 标签名
 * @apiParam {String} desc 备注
 * @apiParam {String} promise 是否重要
 */
router.post('/add', (req, res) => {
  let { title, desc, promise } = req.body;
  firstTog.find({ title }).then(data => {
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
      firstTog.create({ promise, title, desc, typeId: id }, (err, docs) => {
        if (!err) {
          res.send({
            code: 200,
            msg: '新增成功',
          })
        }
      })
    });
})

/**
 * @api {get} /tagList/update 更新一条数据
 * @apiName 更新一条数据
 * @apiGroup tag
 *
 * @apiParam {String} _id 标签Id
 * @apiParam {String} title 标签名
 * @apiParam {String} desc 备注
 * @apiParam {String} promise 是否重要
 */
router.post('/update', (req, res) => {
  let { promise, title, desc, _id } = req.body;
  firstTog.findByIdAndUpdate({ _id }, { title, desc, promise }, {}, (err, docs) => {
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

/**
 * @api {get} /tagList/del 删除一条数据
 * @apiName 删除一条数据
 * @apiGroup tag
 *
 * @apiParam {String} _id 标签Id
 */
router.post('/del', (req, res) => {
  const { _id } = req.body
  firstTog.findByIdAndRemove({ _id }, (err) => {
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