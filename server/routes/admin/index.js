module.exports = (app) => {
  // token加密
  const JwtUtil = require('../../jwt');

  //登录校验中间件
  const authMiddleware = require('../../middleware/auth')
  //校验token中间件
  const tokenMiddleware = require('../../middleware/resource')

  // 注册路由
  app.use('/admin/api/user', authMiddleware(), require('./user')); // 用户或管理员
  app.use('/admin/api/upload', require('./upload')); // 上传路由
  app.use('/admin/api/myInformation', require('./myInformation')); // 资料卡信息
  app.use('/admin/api/webVocabulary', require('./webVocabulary')); // 前端词汇列表
  app.use('/admin/api/excel', require('./excel')); // 导出Excel
  app.use('/admin/api/togList', require('./TogList')); // 标签列表路由

  /* //用于阿里云oss图片上传
const multer = require('multer')
const MAO = require('multer-aliyun-oss')
const upload = multer({
  storage: MAO({
    config: {
      region: 'your region', // 阿里云oss的所在区域，比如oss-cn-shenzhen
      accessKeyId: 'your accessKeyId', // 阿里云oss的accessKeyId，要自己去创建
      accessKeySecret: 'your accessKeySecret', // 阿里云oss的accessKeySecret
      bucket: 'your bucket name', // 阿里云oss的bucket's name
    },
  }),
})
app.post(
  '/admin/api/upload',
  authMiddleware(),
  upload.single('file'),
  async (req, res) => {
    const file = req.file
    res.send(file)
  }
)*/

}
