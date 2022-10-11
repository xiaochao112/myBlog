const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  title: {
    type: String
  },
  img: {
    type: String,
    default: '/static/img/16654514276892856.jpg'
  },
  desc: {
    type: String
  },
  createdAt: Number,
  updatedAt: Number
}, {
  timestamps: {
    currentTime: () => Math.floor(Date.now() / 1000)
  }
})

module.exports = mongoose.model('MyInformation', schema)