const express = require('express')
const cors = require('cors')
const app = express()

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
// app.set('secret', 'i2u34y12oi3u4y8')


// cors解决跨域
app.use(cors())
app.use(express.json())

// 图片上传地址开启静态资源访问
app.use('/uploads', express.static(__dirname + '/uploads'))
// app.use('/', express.static(__dirname + '/web'))
// app.use('/admin', express.static(__dirname + '/admin'))


require('./plugins/db')(app)
require('./routes/admin/index.js')(app)
require('./routes/web/index.js')(app)

app.listen(3000, '0.0.0.0', async (req, res) => {
  console.log('http://localhost:3000')
})
