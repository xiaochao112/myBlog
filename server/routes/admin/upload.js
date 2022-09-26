const express = require('express');
const router = express.Router({
  mergeParams: true,
})
//本地头像上传
const multer = require('multer')
const upload = multer({
  dest: __dirname + '/../../uploads',
})
router.post(
  '/picture',
  upload.single('file'),
  async (req, res) => {
    const file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)
  }
)
module.exports = router;