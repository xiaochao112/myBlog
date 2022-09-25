const mongoose = require("mongoose");
const bcrypt = require('bcryptjs')

// 用户登录或注册
const schema = new mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    select: false,
    set(val) {
      return bcrypt.hashSync(val, 10);
    }
  },
  creationTime: {
    type: Number,
    default: () => Math.floor(Date.now() / 1000)
  },
  endLoginTime: {
    type: Number,
    default: () => Math.floor(Date.now() / 1000)
  },
  roles: {
    type: Array,
    default: ['admin']
  }
});

module.exports = mongoose.model("AdminUser", schema);