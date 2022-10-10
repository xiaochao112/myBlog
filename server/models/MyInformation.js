const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  title: {
    type: String
  },
  img: {
    type: String,
    default: 'http://dummyimage.com/266x400'
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