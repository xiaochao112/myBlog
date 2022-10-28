const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var logsSchema = new Schema({
  url: { type: String }, // 请求路径
  urlType: { type: String }, // 请求类型
  delay: { type: String }, // 延迟（ms）
  code: { type: Number }, // 请求状态
});

var Log = mongoose.model('logs', logsSchema);

module.exports = Log;