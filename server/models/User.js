const mongoose = require("mongoose")
const schema = new mongoose.Schema({
  nickName: {
    type: String,
  },
  email: {
    type: String
  },
  url: {
    type: String
  },
  avatarImg: {
    type: String
  },
  createdAt: Number,
  updatedAt: Number
}, {
  timestamps: {
    currentTime: () => Math.floor(Date.now() / 1000)
  }
})
module.exports = mongoose.model('User', schema)