const express = require('express');
const Log = require('../../models/Log');
const router = express.Router({
  mergeParams: true,
})

/**
 * @api {post} /log/list 获取日志列表信息
 * @apiName 获取日志列表信息
 * @apiGroup log
 *
 * @apiParam {Number} pageNo 页数
 * @apiParam {Number} pageSize 条数
 */
router.post('/list', (req, res) => {
  const pageNo = Number(req.body.pageNo) || 1;
  const pageSize = Number(req.body.pageSize) || 10;
  const userData = {}
  // 正则方法
  const reg = new RegExp()
  // 计数
  Log.countDocuments(userData, (err, count) => {
    if (err) {
      res.send({ code: 500, msg: "列表获取失败" });
      return
    }
    Log.find(userData).skip(pageSize * (pageNo - 1)).limit(pageSize).sort('-createdAt').then(data => {
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


module.exports = router