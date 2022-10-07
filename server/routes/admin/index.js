module.exports = (app) => {

  const JwtUtil = require('../../jwt');
  //登录校验中间件
  const authMiddleware = require('../../middleware/auth')
  //资源中间件
  const resourceMiddleware = require('../../middleware/resource')

  //错误处理函数
  app.use(function (req, res, next) {
    console.log(req.url);
    if (req.url !== '/admin/api/user/login') {
      let token = req.headers['token'];
      if (!token) {
        res.status(401).send({ msg: 'token不能为空' });
      }
      let jwt = new JwtUtil(token);
      let result = jwt.verifyToken();
      // 如果验证通过就next，否则就返回登陆信息不正确
      if (result == 'err') {
        res.status(401).send({ msg: '登录已过期,请重新登录' });
      } else {
        next();
      }
    } else {
      next();
    }
  })

  // 注册路由
  app.use('/admin/api/user', require('./user'));
  app.use('/admin/api/upload', require('./upload'));
  app.use('/admin/api/myInformation', require('./myInformation'));
  app.use('/admin/api/webVocabulary', require('./webVocabulary'));
  app.use('/admin/api/excel', require('./excel'));


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
