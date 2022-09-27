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
  avatar: {
    type: String,
    default: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
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