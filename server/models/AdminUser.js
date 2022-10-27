const mongoose = require("mongoose");
const bcrypt = require('bcryptjs')

// 用户
const schema = new mongoose.Schema({
  username: { type: String, unique: true },// 用户名
  password: {
    type: String,
    select: false,
    set(val) {
      return bcrypt.hashSync(val, 10);
    }
  }, // 密码
  avatar: {
    type: String,
    default: ''
  }, // 头像路径
  creationTime: {
    type: Number,
    default: () => Math.floor(Date.now() / 1000)
  }, // 创建时间
  endLoginTime: {
    type: Number,
    default: () => Math.floor(Date.now() / 1000)
  }, // 最后登录时间
  roles: {
    type: Array,
    default: ['admin']
  },
  roesId: { type: Number } // 权限Id
});

module.exports = mongoose.model("AdminUser", schema);