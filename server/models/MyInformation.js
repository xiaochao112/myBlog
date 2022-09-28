const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  title: {
    type: String
  },
  img: {
    type: String,
    default: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
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