const express = require('express')
const cors = require('cors')
const app = express()
const JwtUtil = require('./utils/jwt');
const log = require('./config/log')
const session = require('express-session');

// 跨域设置
// app.all('*', function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   // 添加token,content-type 字段
//   res.header('Access-Control-Allow-headers', 'Content-type, Content-length, Authorization, Accept, X-request-With,token,content-type');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//   req.header('X-Powered-by', '3.2.1');
//   if (req.method === 'OPTIONS') {
//     res.sendStatus(200)
//   }
//   else next();
// })
// cors解决跨域
app.use(cors())

app.use(express.json())

// 验证码设置
app.use(session({
  secret: 'text',     		//服务器生成 session 签名，可以随意写
  resave: false,              //强制保存 session 即使它没有变化，不配置会有提示
  saveUninitialized: true,    //强制将未初始化的 session 存储
  cookie: {
    maxAge: 1000 * 60,
    secure: false,			//设置为true，表示只有https协议才能访问
  },
  rolling: true,				//常用属性，刷新过期时间，或者说重新设置过期时间
}))

// logger
app.all("*", async (req, res, next) => {
  //响应开始时间
  const start = new Date();
  //响应间隔时间
  var ms;
  try {
    //开始进入到下一个中间件
    await next();
    // debugger
    // throw new Error('验证码错误')
    //记录响应日志
    ms = new Date() - start;
    log.i(req, ms);
  } catch (error) {
    console.log("错误日志：--------------------" + error)
    //记录异常日志
    ms = new Date() - start;
    log.e(req, error, ms);
  }
  console.log(`${req.method} ${req.url} - ${ms}ms-${res.statusCode}`);
});

// 图片上传地址开启静态资源访问
app.use('/static', express.static(__dirname + '/static'))

// app.use('/', express.static(__dirname + '/web'))
// app.use('/admin', express.static(__dirname + '/admin'))

//错误处理函数
// app.use((req, res, next) => {
//   console.log(req.url);
//   if (req.url !== '/admin/api/user/login') {
//     let token = req.headers['token'];
//     if (!token) {
//       res.status(401).send({ msg: 'token不能为空' });
//     }

//     let jwt = new JwtUtil(token);
//     let result = jwt.verifyToken();
//     // 如果验证通过就next，否则就返回登陆信息不正确
//     if (result === 'err') {
//       res.status(401).send({ msg: '登录已过期,请重新登录' });
//     } else {
//       next();
//     }
//   } else {
//     next();
//   }
// })

require('./plugins/db')(app)
require('./routes/index.js')(app)
// require('./routes/web/index.js')(app)

app.listen(3000, '0.0.0.0', async (req, res) => {
  console.log('http://localhost:3000')
})
